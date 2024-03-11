import { Injectable, ElementRef } from '@angular/core';
import { officeCoordinates, homeCoordinates, defaultZoomLevel } from '../constants/mapInfo';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '../../../enviroment';
import { mapStyle } from '../constants/map-style';

@Injectable({
  providedIn: 'root'
})

export class MapService {
  private loader: Loader;
  private isStyleChanged: boolean;


  constructor(){
    this.loader = new Loader({
      apiKey: environment.API_KEY,
      version: 'weekly',
      libraries: ['places'],
    });
    this.isStyleChanged = false;
  }
  private map!: google.maps.Map;
  private directionsService = new google.maps.DirectionsService();
  private directionsRenderer = new google.maps.DirectionsRenderer();

  mapOptions: google.maps.MapOptions = {
      center: officeCoordinates,
      zoom: defaultZoomLevel,
    };

  marker = new google.maps.Marker({
    position: officeCoordinates,
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
      this.map.setZoom(defaultZoomLevel);
    });
  }

  calcRoute(): void {
    const request = {
      origin: homeCoordinates,
      destination: officeCoordinates,
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
    this.map.setCenter(officeCoordinates);
    this.marker.setPosition(officeCoordinates);
    this.map.setZoom(defaultZoomLevel);
    this.directionsRenderer.setMap(null);
  }

  changeMapStyle(): void {
    this.isStyleChanged =  !this.isStyleChanged;
    this.map.setOptions({ styles: this.isStyleChanged ? mapStyle : [] });
  }
}
