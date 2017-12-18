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
      let headers = new Headers({"Content-Type": "application/json","Access-Control-Allow-Headers": "*"});
      let options = new RequestOptions({ headers: headers });
      this.http.post(apiUrl + path, JSON.stringify(credentials), options)
        .subscribe(res => {
          resolve({"data": res.json(), "headers": res.headers,"status": res.status});
        }, (err) => {
          reject(err);
        });
    });
  }

  getData(credentials, path, send_headers) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({"Content-Type": "application/json","Access-Control-Allow-Headers": "*","client": send_headers["client"], "expiry": send_headers["expiry"], "token-type": send_headers["token-type"], "uid": send_headers["uid"], "access-token": send_headers["access-token"] });
      let options = new RequestOptions({ headers: headers });
      this.http.get(apiUrl + path, options)
        .subscribe(res => {
          resolve({"data": res.json(), "headers": res.headers,"status": res.status});
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteData(){
    return new Promise((resolve, reject) => {
      let headers = new Headers({"Content-Type": "application/json","client": send_headers["client"], "expiry": send_headers["expiry"], "token-type": send_headers["token-type"], "uid": send_headers["uid"], "access-token": send_headers["access-token"] });
      let options = new RequestOptions({ headers: headers });
      this.http.delete(apiUrl + path, options)
        .subscribe(res => {
          resolve({"data": res.json(), "headers": res.headers,"status": res.status});
        }, (err) => {
          reject(err);
        });
    });
  }

  validate_token(){
    this.getData(null, "auth/validate_token", JSON.parse(localStorage.getItem('headers'))).then((result) => {
      localStorage.removeItem('headers');
      localStorage.setItem('headers', JSON.stringify(result.headers));
    }, (err) => {
      //Connection Failed Message
      console.log("NO ACCESS");
      console.log(JSON.stringify(err._body));
    });
  }
}
