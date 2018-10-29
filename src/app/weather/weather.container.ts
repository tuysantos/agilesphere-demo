import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as fromWeatherState from './store/selectors/weather.selector';
import * as weatherActions from './store/actions/weather.action';
import * as fromWeather from './store/reducers/weather.reducer';
import {Weather} from '../model/weather';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-weather',
  template: `
  <app-search (searchCityEvent)="citySearch($event)"></app-search>
  <app-results [cities]="weatherList"></app-results>  `
})
export class WeatherContainer implements OnDestroy, OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  weatherList: Weather[];
  selectedCity: string;
  sub: Subscription;
  errorMessage: string;

  constructor(private store: Store<fromWeather.WeatherState>) {}

  ngOnInit() {
    this.store.pipe(select(fromWeatherState.getCurrentCity))
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      currentCity => {
        this.selectedCity = currentCity;
      }
    );

    this.store.pipe(select(fromWeatherState.getWeather))
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      (weather: Weather[]) => {
        this.weatherList = weather;
        console.log(this.weatherList)
      }
    );

    this.store.pipe(select(fromWeatherState.getError))
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      (error : Error) => {
        if(error){
          alert('Error: ' + error.message);
        }
      }
    );
  }

  ngOnDestroy(): void {
   this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  citySearch(city: string): void {
    this.store.dispatch(new weatherActions.SearchCityAction(city));   
  }

}
