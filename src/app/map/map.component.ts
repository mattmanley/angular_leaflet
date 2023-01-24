import {
  Component,
  OnInit,
  HostBinding,
  Input,
  Output,
  OnDestroy,
  EventEmitter,
} from '@angular/core';
import {
  Map,
  Control,
  DomUtil,
  ZoomAnimEvent,
  Layer,
  MapOptions,
  tileLayer,
  latLng,
  geoJSON,
  circleMarker,
} from 'leaflet';

import { latLngToCell } from 'h3-js';
import { GeospatialService } from '../geospatial.service';
import { neighborhoodResponse } from '../geospatial.service';
import { restaurantResponse } from '../geospatial.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnDestroy {
  @Output() map$: EventEmitter<Map> = new EventEmitter();
  @Output() zoom$: EventEmitter<number> = new EventEmitter();
  @Input() options: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        opacity: 0.7,
        maxZoom: 19,
        detectRetina: true,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
    zoom: 10,
    center: latLng(40.70312101432185, -73.90174849077889),
  };
  public map!: Map;
  public zoom!: number;
  private neighborhoods: any;
  private restaurants: any;

  constructor(private geospatialService: GeospatialService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.map.clearAllEventListeners;
    this.map.remove();
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);
    this.geospatialService.getNeighborhoods().subscribe((neighborhoods) => {
      this.neighborhoods = neighborhoods.map(this.formatHoodGeojson);
      this.initNeighborhoodsLayer();
    });
    this.geospatialService.getRestaurants().subscribe((restaurants) => {
      this.restaurants = restaurants.map(this.formatRestaurantGeojson);
      this.initRestaurantsLayer();
    });
  }

  // onMapZoomEnd(e: ZoomAnimEvent) {
  //   this.zoom = e.target.getZoom();
  //   this.zoom$.emit(this.zoom);
  // }

  private initNeighborhoodsLayer() {
    const neighborhoodsLayer = geoJSON(this.neighborhoods, {
      style: (feature) => ({
        weight: 2,
        opacity: 0.25,
        color: '#008f68',
        fillOpacity: 0.5,
        fillColor: '#6DB65B',
      }),
    });

    this.map.addLayer(neighborhoodsLayer);
  }

  initRestaurantsLayer() {
    const markerOptions = {
      weight: 1,
      opacity: 1,
      color: '#000',
      fillOpacity: 0.8,
      radius: 2,
      fillColor: '#ff7800',
    };

    geoJSON(this.restaurants, {
      pointToLayer: function (feature, latLng) {
        return circleMarker(latLng, markerOptions);
      },
    }).addTo(this.map);
  }

  formatHoodGeojson(hoodObj: neighborhoodResponse) {
    return {
      type: 'Feature',
      properties: {
        name: hoodObj.name,
      },
      geometry: {
        type: hoodObj.geometry.type,
        coordinates: hoodObj.geometry.coordinates,
      },
    };
  }

  formatRestaurantGeojson(restObj: restaurantResponse) {
    return {
      type: 'Feature',
      properties: {
        name: restObj.name,
      },
      geometry: {
        type: restObj.location.type,
        coordinates: restObj.location.coordinates,
      },
    };
  }
}
