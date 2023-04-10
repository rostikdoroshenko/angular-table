import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject} from "rxjs";

import {FormattedPerson, Data, FilterType} from "./interfaces";
import {DefaultFilters, FILTERS} from "./config";

@Injectable({
  providedIn: 'root',
})
export class AppService {
  readonly url: string = 'https://randomuser.me/api?results=100&seed=true';

  private changeParams: Subject<void> = new Subject<void>();
  changeParams$: Observable<void> = this.changeParams.asObservable();

  defaultFilters= DefaultFilters;
  filters = JSON.parse(
    localStorage.getItem(FILTERS)
    || JSON.stringify(this.defaultFilters));

  isShowCity = !!this.filters.city;
  isShowStreet = !!this.filters.street;

  constructor(private http: HttpClient) {}

  setChangeParams(): void {
    this.changeParams.next();
  }

  generateParams(): string {
    const filtersArray = Object.values(this.filters).map(param => {
      if (param === FilterType.city || param === FilterType.street) {
        param = 'location'
      }
      return param;
    });
    this.isShowCity = !!this.filters.city;
    this.isShowStreet = !!this.filters.street;
    return `&inc=picture,name,${filtersArray.join(',')}`;
  }

  getData(): Observable<FormattedPerson[]> {
    return this.http.get<Data>(`${this.url}${this.generateParams()}`).pipe(
      map((data: Data) => data.results
        .map(item => ({
            name: `${item.name?.first} ${item.name?.last}`,
            phone: item.phone,
            street: this.isShowStreet
              ? `${item.location?.street?.number}, ${item.location?.street?.name}`
              : undefined,
            city: this.isShowCity ? item.location?.city : undefined,
            email: item.email,
            picture: item.picture?.medium,
            gender: item.gender
          })
        )
      )
    );
  }
}
