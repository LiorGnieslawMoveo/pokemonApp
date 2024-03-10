import { Injectable, ElementRef } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";
import { Coordinates } from '../interfaces/coordinates.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: google.maps.Map = undefined;
  private directionsService = new google.maps.DirectionsService();
  private directionsRenderer = new google.maps.DirectionsRenderer();

  home: Coordinates = {
    lat: 32.0932539,
    lng: 34.7759649
  };

  office: Coordinates = {
    lat: 32.0624076,
    lng: 34.7707653
  };

  coordinates = new google.maps.LatLng(this.office.lat, this.office.lng);
  mapOptions: google.maps.MapOptions = {
      center: this.coordinates,
      zoom: 15,
    };

  marker = new google.maps.Marker({
    position: this.office,
    map: this.map,
  });

  initMap(mapContainer: ElementRef, searchInput: ElementRef<HTMLInputElement>): void {
    const loader = new Loader({
      apiKey: 'AIzaSyAprBGltoQnlqmfETgqf-QxvazlxQRn2oA',
      version: "weekly",
    });

    loader.load().then(() => {
      this.map = new google.maps.Map(mapContainer.nativeElement, this.mapOptions);
      this.marker.setMap(this.map);
      this.directionsRenderer.setMap(this.map);

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
    });
  }

  calcRoute(): void {
    var home = new google.maps.LatLng(this.home.lat, this.home.lng);
    var office = new google.maps.LatLng(this.office.lat, this.office.lng);

    const request = {
      origin: home,
      destination: office,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(result);
      }
    });
  }
}
