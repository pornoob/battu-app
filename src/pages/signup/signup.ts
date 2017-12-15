import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs'
import { LoginPage } from '../login/login'
import { AuthService } from '../../providers/auth-service/auth-service'
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  responseData : any;
  userData = {"name": "", "lastname": "", "email": "","password":"", "password_confirmation": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){
    this.authService.postData(this.userData, "users").then((result) => {
      this.responseData = result;
      localStorage.setItem('userData', JSON.stringify(this.responseData))
      this.navCtrl.push(TabsPage);
    }, (err) => {
      //Connection Failed Message
      console.log(JSON.stringify(err._body))
    });
  }

  login(){
      this.navCtrl.push(LoginPage);
  }

}
