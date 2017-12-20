import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { StorageService } from '../../providers/storage-service/storage-service';
import 'rxjs/add/operator/map';


let apiUrl = 'http://battu.apptec.cl/api/v1/';
let validate_token = "auth/validate_token";

@Injectable()
export class AuthService {

  constructor(public http : Http, private storageService: StorageService) {
    console.log('Hello AuthService Provider');
  }

  postData(credentials, path, send_headers = null) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({"Content-Type": "application/json","Access-Control-Allow-Headers": "*"});
      let options = new RequestOptions({ headers: headers });
      this.http.post(apiUrl + path, JSON.stringify(credentials), options)
        .subscribe(res => {
          this.refresh_token(res.headers);
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
          this.refresh_token(res.headers);
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  getToken(send_headers) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({"Content-Type": "application/json","Access-Control-Allow-Headers": "*","client": send_headers["client"], "expiry": send_headers["expiry"], "token-type": send_headers["token-type"], "uid": send_headers["uid"], "access-token": send_headers["access-token"] });
      let options = new RequestOptions({ headers: headers });
      this.http.get(apiUrl + validate_token, options)
        .subscribe(res => {
          resolve(res.headers);
        }, (err) => {
          reject(err);
        });
    });
  }
  validate_token(){
    this.getToken(JSON.parse(localStorage.getItem('headers'))).then((result) => {
      this.refresh_token(result);
    }, (err) => {
      //Connection Failed Message
      console.log("No Access");
      console.log(JSON.stringify(err._body));
    });
  }

  refresh_token(headers){
    let result_headers = JSON.stringify(headers);
    let rep = JSON.parse(result_headers);
    if(rep["access-token"]){
      console.log("Refreshing Token "+ rep["access-token"]);
      localStorage.removeItem('headers');
      localStorage.setItem('headers', JSON.stringify(headers));
      this.storageService.set('headers',JSON.stringify(headers));
    }
  }

  deleteData(credentials, path, send_headers){
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
}
