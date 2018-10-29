import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WeatherModule } from './weather/weather.module';
import { FormsModule } from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import { AppComponent } from './app.component';
import {WeatherService} from '../app/weather/weather.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    WeatherModule,
    FormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent],
  exports: [FormsModule]
})
export class AppModule { }
