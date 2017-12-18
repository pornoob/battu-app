import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userDetail : any;
  public data : any;
  isLoggedIn: boolean = false;
  userData = {"user_id": "", "token": ""};

  constructor(public navCtrl: NavController, public app: App, public authService: AuthService) {
    if(localStorage.getItem("headers")) {
      this.isLoggedIn = true;
      const response = JSON.parse(localStorage.getItem('userData'));
      this.userDetail = response.data;
      this.validate_token();
      this.getData();
   }
  }

  getData(){
    this.authService.getData(null, "base", JSON.parse(localStorage.getItem('headers'))).then((result) => {
      this.data = result.data.data.message;
    }, (err) => {
      //Connection Failed Message
      console.log("No Data");
      console.log(JSON.stringify(err._body));
    });
  }

  validate_token(){
    if (JSON.parse(localStorage.getItem('headers'))){
      if (this.authService.validate_token()){

      }else{
        console.log("SALIO");
        // localStorage.clear();
        // this.navCtrl.setRoot(WelcomePage);
      }
    }else{
      // localStorage.clear();
      // this.navCtrl.setRoot(WelcomePage);
      console.log("No headers");
    }
  }

  backToWelcome(){
    const root = this.app.getRootNav();
    root.setRoot(WelcomePage);
  }

  logout(){
    //Api Token Logout
    localStorage.clear();
    setTimeout(()=> this.backToWelcome(), 2000);
  }
}
