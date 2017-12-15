import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://localhost:3000/api/v1/';

@Injectable()
export class AuthService {

  constructor(public http : Http) {
    console.log('Hello AuthService Provider');
  }

  postData(credentials, path) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({"Content-Type": "application/json",'Access-Control-Allow-Origin': '*',});
      let options = new RequestOptions({ headers: headers });
      this.http.post(apiUrl + path, JSON.stringify(credentials), options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

}
