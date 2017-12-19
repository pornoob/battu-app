import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  map: any;

  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation
  ) {}

  ionViewDidLoad(){
  }


}
