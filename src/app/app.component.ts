import { Component } from '@angular/core';
import { Map } from 'leaflet';
import { GeospatialService } from './geospatial.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private map!: Map;
  private zoom!: number;

  constructor(private geospatialService: GeospatialService) {}

  receiveMap(map: Map) {
    this.map = map;
  }
  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }
}
