import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { locationDTO } from '../locationDTO';
import 'leaflet-routing-machine';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, AfterViewInit {

  map: any;
  datos: locationDTO = new locationDTO();
  marker: any;
  p: number;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getPosition();
    /*  this.map = L.map("map").setView([51.505, -0.09], 13);
 
     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
       attribution:
         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
     }).addTo(this.map);
 
     L.Routing.control({
       waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
       routeWhileDragging: true
     }).addTo(this.map); */

  }

  private initMap(lat: number, lon: number): void {
    this.map = L.map('map', {
      center: [lat, lon],
      zoom: 20
    });
  }


  getPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      let icons = 'assets/location.png'
      console.log("Got position", position.coords);
      this.datos.lat = position.coords.latitude;
      this.datos.lon = position.coords.longitude;
      this.initMap(this.datos.lat, this.datos.lon);
      let markerIcon = L.icon({ iconUrl: 'assets/home2.png', iconSize: [55, 55] });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      this.marker = L.marker([this.datos.lat, this.datos.lon],
        { title: "MyPoint", alt: "The Big I", draggable: true, icon: markerIcon })
        /* .on('click', function () {
          this.marker.bindPopup("Tu casa");
        }) */
        .addTo(this.map)

      let route = L.Routing.control({
        waypoints: [
          L.latLng(40.5663651, -75.6032277),
          L.latLng(40.00195, -76.073299),
          L.latLng(42.3673945, -83.0750408)
        ]
      }).addTo(this.map)
    },
      err => {
        console.log(err)
      });
  }

  tomarPosicion() {
    console.log(this.marker.getLatLng())
  }
}
