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
  public dato : any;
  public dataSet : any;
  public message : any;

  constructor(public navCtrl: NavController, public app: App, public authService: AuthService) {
      const response = JSON.parse(localStorage.getItem('userData'));
      this.userDetail = response.data;
      this.getDataUsers();
  }

  getDataUsers(){
    this.authService.getData(null, "base/users", JSON.parse(localStorage.getItem('headers'))).then((result) => {
      this.dato = result;
      if (this.dato.users.data){
        this.dataSet = this.dato.users.data
        this.message = this.dato.data.message
      }
    }, (err) => {
      //Connection Failed Message
      console.log("No Data");
      console.log(JSON.stringify(err._body));
    });
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
