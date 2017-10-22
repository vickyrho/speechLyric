import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {ToastController} from "ionic-angular";

@Injectable()

export class MainClass {

  public cx='016471701269971116013:schpf-bgrj0';
  public key='AIzaSyADkln8zQFydHLCIViLdjIzCMf-cVjMtug';
  constructor( public http : Http ,public toast : ToastController){

  }

  getSearchResults(result): Observable<any> {
    return this.http.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyAHWXEpSqNu3BXJaAM9OCTVbW8hjqhZJtM&cx=016471701269971116013:2vit3-v3-ce&q='+result)
      .map(data => {
        console.log(data.json());
        return data.json();
      })
      .catch( err => Observable.throw(err.json()))
  }

  fetchLyrics(data) : Observable<any> {
    return this.http.post('http://localhost:5000/fetch',data)
      .map(data => {
        console.log(data.json());
        return data.json();
      })
      .catch( err => Observable.throw(err.json()))
  }

}
