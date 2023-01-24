import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { GeospatialService } from './geospatial.service';

@NgModule({
  declarations: [AppComponent, MapComponent],
  imports: [BrowserModule, LeafletModule, HttpClientModule],
  providers: [GeospatialService],
  bootstrap: [AppComponent],
})
export class AppModule {}
