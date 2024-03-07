import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";
import { env } from '../../constants/env';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  
  ngOnInit(): void {  
    const loader = new Loader({
      // apiKey: process.env.GOOGLE_MAPS_API_KEY,
      apiKey: 'AIzaSyD-0OWZHN3odTcFaBU4CNVpRDh9Wd_Ro20',
      version: "weekly",
    });

    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    });
  }
}
