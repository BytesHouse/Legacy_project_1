export interface PeopleContent {
  id: string;
  companyId?: any;
  countryIsoCode: string;
  firstName: string;
  lastName: string;
  imageId: string;
  headerImageId?: any;
  companyName: string;
  position?: any;
  companyType: string;
}

export interface Pageable {}

export interface Sort {}

export interface SearchPeople {
  content: PeopleContent[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  sort: Sort;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}
