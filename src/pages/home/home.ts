import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { WelcomePage } from '../welcome/welcome';
import { StorageService } from '../../providers/storage-service/storage-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userDetail : any;
  public dato : any;
  public dataSet : any;
  public message : any;
  public storage : any;

  constructor(public navCtrl: NavController, public app: App, public authService: AuthService,  private storageService: StorageService) {
      const response = JSON.parse(localStorage.getItem('userData'));
      this.userDetail = response.data;
      this.getDataUsers();
      this.set_storage();
      console.log("Storage Fuera");
      console.log(this.storage);
  }

  set_storage(){
    this.storage  = this.storageService.get("headers");
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
