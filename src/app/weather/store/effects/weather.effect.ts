import { Injectable } from "@angular/core";
import {Observable} from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import {Action} from '@ngrx/store';
import { WeatherService } from "../../weather.service";
import {Actions, Effect, ofType} from "@ngrx/effects";
import { WeatherActionTypes } from "../actions/weather.action";
import { switchMap, map, catchError } from "rxjs/operators";
import * as WeatherActions from '../actions/weather.action';
import { HttpErrorResponse } from '@angular/common/http';
import {Weather} from '../../../model/weather';

@Injectable()
export class WeatherEffects {
    @Effect()  loadWeather$: Observable<Action>;
    constructor(private weatherService: WeatherService,
        private actions$: Actions){

        this.loadWeather$ = this.actions$.ofType(WeatherActionTypes.SEARCH_CITY).pipe(
            switchMap((state: WeatherActions.SearchCityAction) =>
                this.weatherService.searchWeatherForCity(state.payload).pipe(
                    map((res: Weather )=> new WeatherActions.SearchCitySuccessAction(res)),
                    catchError((err: HttpErrorResponse) => observableOf(new WeatherActions.SearchCityFailAction(err.error)))
                )
            ) 
        );

    }    
}