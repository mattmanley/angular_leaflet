import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface neighborhoodResponse {
  _id: string;
  geometry: {
    type: string;
    _id: string;
    coordinates: [];
  };
  name: string;
}

export interface restaurantResponse {
  _id: string;
  location: {
    type: string;
    _id: string;
    coordinates: [];
  };
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class GeospatialService {
  constructor(private http: HttpClient) {}

  getNeighborhoods() {
    return this.http.get<neighborhoodResponse[]>(
      'https://leaflet-node.onrender.com/api/neighborhoods'
    );
  }

  getRestaurants() {
    return this.http.get<restaurantResponse[]>(
      'https://leaflet-node.onrender.com/api/restaurants'
    );
  }
}
