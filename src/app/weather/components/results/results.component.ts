import { Component, OnChanges, Input } from '@angular/core';
import {Weather} from '../../../model/weather';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges {
  @Input() cities: Weather[];

  constructor() {}

  ngOnChanges() {
    // IMPLEMENT ANYTHING YOU BEKIEVE YOU MIGHT NEED HERE
  }
 
  findTemperatureByHour(hour, dataList): string {
    let temperature = 'N/A';
    for(let i=0; i< dataList.length; i++){
      let fullDate = dataList[i].dt_txt.split(' ');
      if(fullDate[1] === hour){
        temperature = dataList[i].main.temp;
        break;
      }
    }
    return temperature;
  }
}



