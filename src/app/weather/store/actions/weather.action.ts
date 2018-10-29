import { Action } from '@ngrx/store';
import {Weather} from '../../../model/weather';

export enum WeatherActionTypes {
    SEARCH_CITY = '[Weather] Search for a city ',
    SEARCH_CITY_SUCCESS = '[Weather API] Search Success',
    SEARCH_CITY_FAIL = '[Weather API] Search Fail'
}

export class SearchCityAction implements Action {
    readonly type = WeatherActionTypes.SEARCH_CITY;
    constructor(public payload : string){}
}

export class SearchCitySuccessAction implements Action {
    readonly type = WeatherActionTypes.SEARCH_CITY_SUCCESS;
    constructor(public payload : Weather){}
}

export class SearchCityFailAction implements Action {
    readonly type = WeatherActionTypes.SEARCH_CITY_FAIL;
    constructor(public error : Error){}
}

export type WeatherActions = SearchCityAction
    | SearchCitySuccessAction
    | SearchCityFailAction ;