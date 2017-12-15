import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userDetail : any;

  constructor(public navCtrl: NavController, public app: App) {
    const data = JSON.parse(localStorage.getItem('userData'))
    this.userDetail = data.userData
  }
  backToWelcome(){
    const root = this.app.getRootNav();
    root.popToRoot();
  }
  logout(){
    //Api Token Logout
    console.log("aaa")
    localStorage.clear();
    setTimeout(()=> this.backToWelcome, 1000);
  }
}
