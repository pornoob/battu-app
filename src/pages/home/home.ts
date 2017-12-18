import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userDetail : any;
  public data : any;

  userData = {"user_id": "", "token": ""};

  constructor(public navCtrl: NavController, public app: App, public authService: AuthService) {
    const response = JSON.parse(localStorage.getItem('userData'));
    this.userDetail = response.data;
    this.authService.validate_token();
    this.getData();
  }

  getData(){
    this.authService.getData(null, "base", JSON.parse(localStorage.getItem('headers'))).then((result) => {
      this.data = result.data.data.message;
    }, (err) => {
      //Connection Failed Message
      console.log("NO ACCESS");
      console.log(JSON.stringify(err._body));
    });
  }

  backToWelcome(){
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  logout(){
    //Api Token Logout
    localStorage.clear();
    setTimeout(()=> this.backToWelcome(), 2000);
  }
}
