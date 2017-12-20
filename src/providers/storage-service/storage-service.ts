import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

let apiUrl = 'http://http://battu.apptec.cl/api/v1/';
let validate_token = "auth/validate_token"
@Injectable()
export class StorageService {

  data : any;

  constructor(public http : Http, private storage: Storage) {
    console.log("data : ",this.data);
  }
  set(key, value){
    this.storage.set(key, value);
  }
  get(key: string) {
    this.storage.get(key).then((value) => {
      console.log('Data Dentro de la funcion', value);
      return value;
    });
  }
}
