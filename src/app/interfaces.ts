export enum FilterType {
  gender = 'gender',
  city = 'city',
  street = 'street',
  email = 'email',
  phone = 'phone',
}
export interface Person {
  email: string;
  location: any;
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  }
  phone: string;
  picture: any;
}

export interface FormattedPerson {
  phone?: string;
  name: string;
  email?: string;
  picture: string;
  gender?: string;
  city?: string;
  street?: string;
}
export interface Data {
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  };
  results: Person[];
}
