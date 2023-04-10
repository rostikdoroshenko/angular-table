import { Component } from '@angular/core';

import {AppService} from "../app.service";
import {FilterType} from "../interfaces";
import {FILTERS} from "../config";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  protected readonly FilterType = FilterType;

  filters = this.appService.filters;

  constructor(private appService: AppService) {
  }
  changeEvent(event: Event, type: FilterType): void {
    if (event) {
      this.filters[type] = type;
    } else {
      delete this.filters[type];
    }
    localStorage.setItem(FILTERS, JSON.stringify(this.filters));
    this.appService.setChangeParams();
  }
}
