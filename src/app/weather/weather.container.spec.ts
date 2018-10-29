import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherContainer } from './weather.container';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import { FormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {RoundPipe} from '../share/round.pipe';
import {WeatherService} from '../weather/weather.service';
import * as fromWeatherState from './store/selectors/weather.selector';
import {Weather} from '../model/weather';
import * as actions from '../weather/store/actions/weather.action';
import * as fromWeather from './store/reducers/weather.reducer';
 
describe('WeatherContainer', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;
  let weathers: Weather[];

  let dispatchSpy: jasmine.Spy;
  let store: Store<fromWeather.WeatherState>;
  let err: Error;
  
  err = {
    name: '404',
    message: 'city not found'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent,
        ResultsComponent,
        WeatherContainer,
        RoundPipe],
      imports: [
        CommonModule,
        FormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [WeatherService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    dispatchSpy = spyOn(store, 'dispatch');

    spyOn(fromWeatherState, 'getCurrentCity').and.returnValue('London');
    spyOn(fromWeatherState, 'getWeather').and.returnValue(weathers);
    spyOn(fromWeatherState, 'getError').and.returnValue(Error);
    
    fixture.detectChanges();
  });

  it('should create weather container', () => {
    expect(component).toBeTruthy();
  });

  xit('should call SearchCityAction', ()=>{
    spyOn(actions, 'SearchCityAction').and.returnValue({type: actions.WeatherActionTypes.SEARCH_CITY, payload: 'London'});  
    component.citySearch('London');
    expect(actions.SearchCityAction).toHaveBeenCalled();
    expect(component.selectedCity).toEqual('London');
  });

  it('should dispatch with correct parameters', (done: any) => {
    component.citySearch('London');
    expect(dispatchSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
          type: actions.WeatherActionTypes.SEARCH_CITY,
          payload: 'London'
      }));
    done();
  });
});
