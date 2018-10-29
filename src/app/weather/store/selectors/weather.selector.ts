import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromWeathers from '../reducers/weather.reducer';

const getWeatherFeatureState = createFeatureSelector<fromWeathers.WeatherState>('weather');

export const getWeather = createSelector(
    getWeatherFeatureState, state => state.weather
);

export const getError = createSelector(
    getWeatherFeatureState, state => state.error
);

export const getCurrentCity = createSelector(
    getWeatherFeatureState, state => state.currentCity
);
