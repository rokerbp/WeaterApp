import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstantsProvider } from '../../providers/app-constants/app-constants';
import { WeatherApiProvider } from '../../providers/weather-api/weather-api';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the WeatherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {

  weatherForm: FormGroup;
  private appConstants: any;
  private Weather: any;
  private geometry: any;
  private currentWeather: any;
  weatherResult: boolean;
  summaryIcon: string;

  constructor(private navController: NavController, private fb: FormBuilder, appConstants:
    AppConstantsProvider, WeatherApi: WeatherApiProvider, private geolocation: Geolocation) {
    this.weatherForm = fb.group({
      'location': ['', Validators.compose([Validators.required, Validators.pattern
        ('[a-zA-Z, ]*'), Validators.minLength(3), Validators.maxLength(100)])]
    });
    this.appConstants = appConstants;
    this.Weather = WeatherApi;
    this.geometry = { "longitude": "", "latitude": "" };
    this.currentWeather = {};
    this.weatherResult = false;
    this.summaryIcon = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeatherPage');
  }

  getWeather(formData: any) {
    this.Weather.getGeometry(this.appConstants.getGoogleAPIURL() + 'address=', formData.value.location).
      subscribe((data: any) => {
        this.geometry.longitude = data.results[0].geometry.location.lng;
        this.geometry.latitude = data.results[0].geometry.location.lat;
        console.log('Geometrylat: ' + this.geometry.longitude + ', Geometrylong: ' +
          this.geometry.latitude);
        this.Weather.getCurrentWeather(this.geometry.longitude, this.geometry.latitude).
          subscribe((weatherData: any) => {
            this.currentWeather = weatherData.currently;
            this.weatherResult = true;
            if (this.currentWeather.summary.toLowerCase().indexOf("cloudy") > 0)
              this.summaryIcon = "cloudy";
            else if (this.currentWeather.summary.toLowerCase().indexOf("rainy") > 0)
              this.summaryIcon = "rainy";
            else if (this.currentWeather.summary.toLowerCase().indexOf("sunny") > 0)
              this.summaryIcon = "sunny";
            else if (this.currentWeather.summary.toLowerCase().indexOf("thunderstorm") > 0)
              this.summaryIcon = "thunderstorm";
          });
      });
  }

  getLocalWeather(formData: any) {
    this.geolocation.getCurrentPosition().then(pos => {
      this.Weather.getLocation(this.appConstants.getGoogleAPIURL() + 'latlng=',
        pos.coords.latitude, pos.coords.longitude).
        subscribe((data: any) => {
          var currentLocation = data.results[0].address_components[2].long_name;
          this.weatherForm.controls['location'].setValue(currentLocation);
          console.log('City: ' + formData.value.location);
          this.getWeather(formData);
        });
    });
  }

}
