import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AppConstantsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppConstantsProvider {

  googleAPIURL: string;
  forecastURL: string;

  constructor(public http: HttpClient) {
    //console.log('Hello AppConstantsProvider Provider');
    this.googleAPIURL = "https://maps.googleapis.com/maps/api/geocode/json?";
    this.forecastURL = "https://api.darksky.net/forecast/a1355490bb4ef67ccfc8e6a23cb7947e/";
  }

  getGoogleAPIURL() {
    return this.googleAPIURL;
  }

  getForecastURL() {
    return this.forecastURL;
  }
}
