
import * as interfaces from '../../../model/weather';
import {WeatherActions, WeatherActionTypes} from '../actions/weather.action';
import {Weather} from '../../../model/weather';

export interface WeatherState {
    error: Error;
    weather: interfaces.Weather[];
    currentCity: string;
}

export const initialState: WeatherState = {
    error: null,
    weather: null,
    currentCity: null
}

function addItemToList(weather: Weather, weatherList: Weather[]): Weather[]{
    let ffound = false;
    if(weatherList){
        for(let i=0; i< weatherList.length; i++){
            if(weatherList[i].city.id === weather.city.id){
                ffound = true;
            }
        }
    }
    else {
        weatherList = [];
    }
    
    if(!ffound){
        weatherList[weatherList.length] = weather;
    }

    return weatherList;
}

export function reducer(state = initialState, action: WeatherActions): WeatherState{
    switch(action.type){
        case WeatherActionTypes.SEARCH_CITY:
            return {
                ...state,
                currentCity: action.payload
            }

        case WeatherActionTypes.SEARCH_CITY_SUCCESS:
            return {
                ...state,
                weather: addItemToList(action.payload, state.weather)
            }

        case WeatherActionTypes.SEARCH_CITY_FAIL:
            return {
                ...state,
                error : action.error
            }

        default:
            return state;
    }
}