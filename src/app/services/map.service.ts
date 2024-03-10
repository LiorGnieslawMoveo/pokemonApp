import { Injectable, ElementRef } from '@angular/core';
import { Coordinates } from '../interfaces/coordinates.interface';

@Injectable({
  providedIn: 'root'
})

export class MapService {
  private map!: google.maps.Map;
  private directionsService = new google.maps.DirectionsService();
  private directionsRenderer = new google.maps.DirectionsRenderer();

  homeCoordinates: Coordinates = {
    lat: 32.0932539,
    lng: 34.7759649
  };
  home = new google.maps.LatLng(this.homeCoordinates);

  officeCoordinates: Coordinates = {
    lat: 32.0624076,
    lng: 34.7707653
  };
  office = new google.maps.LatLng(this.officeCoordinates);


  coordinates = new google.maps.LatLng(this.officeCoordinates);
  mapOptions: google.maps.MapOptions = {
      center: this.coordinates,
      zoom: 15,
    };

  marker = new google.maps.Marker({
    position: this.officeCoordinates,
    map: this.map,
  });

  initMap(mapContainer: ElementRef, searchInput: ElementRef<HTMLInputElement>): void {
    this.createMap(mapContainer);
    this.setupAutocomplete(searchInput);
  }

  private createMap(mapContainer: ElementRef): void {
    this.map = new google.maps.Map(mapContainer.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
    this.directionsRenderer.setMap(this.map);
  }

  private setupAutocomplete(searchInput: ElementRef<HTMLInputElement>): void {
    const autocomplete = new google.maps.places.Autocomplete(searchInput.nativeElement);
    autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        return;
      }
      const location = place.geometry.location;
      const coordinates = new google.maps.LatLng(location.lat(), location.lng());

      this.map.setCenter(coordinates);
      this.marker.setPosition(coordinates);
      this.map.setZoom(15);
    });
  }

  calcRoute(): void {
    const request = {
      origin: this.home,
      destination: this.office,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    this.directionsRenderer.setMap(this.map);
    this.directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(result);
      }
    });
  }

  resetMap(searchInput: HTMLInputElement): void {
    searchInput.value = '';
    this.map.setCenter(this.office);
    this.marker.setPosition(this.office);
    this.map.setZoom(15);
    this.directionsRenderer.setMap(null);
  }
}
