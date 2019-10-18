import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstantsProvider } from '../app-constants/app-constants';
import { Observable } from 'rxjs/Rx'; import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherApiProvider {
  weatherURL: string;
  private constantVar: any;
  constructor(public http: HttpClient, constantVar: AppConstantsProvider) {
    //console.log('Hello WeatherApiProvider Provider');
    this.constantVar = constantVar;
    this.weatherURL = constantVar.getForecastURL();
  }
  getCurrentWeather(longitude: any, latitude: any) {
    return this.http.get(this.weatherURL + latitude + "," + longitude)
  }

  getGeometry(googleAPIURL: any, location: any) {
    return this.http.get(googleAPIURL + "'" + location + "'")
  }

  getLocation(googleAPIURL: any, currentLatitude: any, currentLongitude: any) {
    var address = googleAPIURL + currentLatitude + ',' + currentLongitude;
    console.log('Address: ' + address);
    return this.http.get(address);
  }
}
