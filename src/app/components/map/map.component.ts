import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})


export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef<HTMLInputElement>;

  map: google.maps.Map = undefined;
  lat = 32.0624076;
  lng = 34.7707653;

  coordinates = new google.maps.LatLng(this.lat, this.lng);
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 15,
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

    ngAfterViewInit() {  
    this.mapInitializer();
  }

  mapInitializer() {


    const loader = new Loader({
            apiKey: 'AIzaSyAprBGltoQnlqmfETgqf-QxvazlxQRn2oA',
            version: "weekly",
          });

    loader.load().then(() => {  
      this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
      this.marker.setMap(this.map);
    });

    this.directionsRenderer.setMap(this.map);
    const autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        return;
      }

      const location = place.geometry.location;
      this.coordinates = new google.maps.LatLng(location.lat(), location.lng());

      this.marker.setPosition(this.coordinates);
      this.map.setCenter(this.coordinates);
      this.map.setZoom(this.mapOptions.zoom);
    });
   }

   calcRoute() {
    var home = new google.maps.LatLng(37.7699298, -122.4469157);
    var office = new google.maps.LatLng(37.7683909618184, -122.51089453697205);
    this.directionsRenderer.setMap(this.map)

    var request = {
      origin: home,
      destination: office,
      travelMode:google.maps.TravelMode['DRIVING']
    };

    this.directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        this.directionsRenderer.setDirections(result);
      }
    });
  }
}
