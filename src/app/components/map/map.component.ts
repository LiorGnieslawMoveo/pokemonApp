import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})

export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer', {static: false}) mapContainer: ElementRef;
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef<HTMLInputElement>;

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {  
    this.mapService.initMap(this.mapContainer, this.searchInput);
  }

   calcRoute(): void {
    this.mapService.calcRoute();
  }

  resetMap(searchInput: HTMLInputElement): void {
    this.mapService.resetMap(searchInput);
  }
}
