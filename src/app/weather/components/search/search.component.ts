import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent{
  searchCity: string = '';
  @Output() searchCityEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  search() {
    this.searchCityEvent.emit(this.searchCity);
  }
}
