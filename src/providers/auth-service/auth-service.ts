import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://localhost:3000/api/v1/';

@Injectable()
export class AuthService {

  constructor(public http : Http) {
    console.log('Hello AuthService Provider');
  }

  postData(credentials, path, send_headers = null) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({"Content-Type": "application/json"});
      let options = new RequestOptions({ headers: headers });
      this.http.post(apiUrl + path, JSON.stringify(credentials), options)
        .subscribe(res => {
          resolve({"data": res.json(), "headers": res.headers});
        }, (err) => {
          reject(err);
        });
    });
  }

  getData(credentials, path, send_headers = null) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({"Content-Type": "application/json","client": send_headers["client"], "expiry": send_headers["expiry"], "token-type": send_headers["token-type"], "uid": send_headers["uid"], "access-token": send_headers["access-token"] });
      let options = new RequestOptions({ headers: headers });
      this.http.get(apiUrl + path, options)
        .subscribe(res => {
          resolve({"data": res.json(), "headers": res.headers});
        }, (err) => {
          reject(err);
        });
    });
  }
}
