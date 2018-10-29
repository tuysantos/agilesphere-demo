import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherContainer } from './weather.container';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/reducers/weather.reducer';
import {WeatherEffects} from './store/effects/weather.effect';
import {RoundPipe} from '../share/round.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('weather', reducer),
    EffectsModule.forFeature([WeatherEffects])
  ],
  declarations: [
    SearchComponent,
    ResultsComponent,
    WeatherContainer,
    RoundPipe
  ],
  providers: [
    
  ]
})
export class WeatherModule { }
