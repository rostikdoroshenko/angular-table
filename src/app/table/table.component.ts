import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";

import {AppService} from "../app.service";
import {FormattedPerson} from "../interfaces";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject();
  dataSource$: Observable<FormattedPerson[]> = this.appService.getData();

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.changeParams$.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.dataSource$ = this.appService.getData());
  }

  ngOnDestroy() {
    this.destroy$.next(false);
  }
}
