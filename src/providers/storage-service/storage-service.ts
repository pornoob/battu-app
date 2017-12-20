import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

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
    return this.storage.get(key).then((value) => {
      console.log('Data Dentro de la funcion', value);
      return value;
    });
  }
}
