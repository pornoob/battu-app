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
      console.log("Storage Fuera de la funcion");
      console.log(this.storage);
  }

  set_storage(){
    this.storageService.get("headers").then((result) => {
      console.log("Dentro del set_storage:", result);
    }, (err) => {
      //Connection Failed Message
      console.log("No Data");
      console.log(JSON.stringify(err._body));
    });
  }

  getDataUsers(){
    var self = this;
    this.storageService.get("headers").then(result => {
      console.log("aca tamos promise 1", result);
      return self.authService.getData(null, "base/users", JSON.parse(result))
    }).then(result => {
      console.log("aca tamos promise 2", result);
      self.dato = result;
      if (self.dato.users.data){
        self.dataSet = self.dato.users.data
        self.message = self.dato.data.message
      }
    })
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
