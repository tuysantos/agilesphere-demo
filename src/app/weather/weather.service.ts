import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/forecast';
  params = {
    q: '',
    cnt: '8',
    units: 'metric',
    APPID: 'c096e813a83715b081b9ddc4e027f885'
  };

  constructor(private http: HttpClient) { }

  searchWeatherForCity(payload: string): Observable<any> {
    this.params.q = payload;
    return this.http.get(this.url,{params:this.params});
  }

}
