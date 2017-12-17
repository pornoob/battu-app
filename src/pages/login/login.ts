import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs'


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  responseData : any;
  userData = {"email": "","password":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.authService.postData(this.userData, "auth/sign_in").then((result) => {
      this.responseData = result;
      localStorage.setItem('userData', JSON.stringify(this.responseData.data));
      localStorage.setItem('headers', JSON.stringify(this.responseData.headers));
      this.navCtrl.push(TabsPage);
    }, (err) => {
      //Connection Failed Message
      console.log(JSON.stringify(err._body))
    });
  }

}
