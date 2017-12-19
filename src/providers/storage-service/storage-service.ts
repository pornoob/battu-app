import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

let apiUrl = 'http://localhost:3000/api/v1/';
let validate_token = "auth/validate_token"
@Injectable()
export class StorageService {

  constructor(public http : Http, private storage: Storage) {
    console.log('Hello StorageService Provider');
  }
  set(key, value){
    this.storage.set(key, value);
  }
  get(key): any {
    return this.storage.get(key).then((value) => {
      return value;
    });
  }
  destroy(key){
    this.storage.remove(key);
  }
  getData(key){
    return this.get(key).then((val)=>{
      console.log("dentro de getdata",val);
      return val;
     }).catch(error=>{
       //handle error
     });
  }
}
