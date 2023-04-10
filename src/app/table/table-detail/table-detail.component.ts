import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {FormattedPerson} from "../../interfaces";

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDetailComponent {
  @Input() data!: FormattedPerson;
}
