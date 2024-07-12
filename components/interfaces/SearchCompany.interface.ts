export interface CompanyContent {
  createdDate?: any;
  name: string;
  imageId?: any;
  countryIsoCode: string;
  qoobusId: number;
  city?: any;
  address: string;
  vat?: any;
  nationalCourtRegister?: any;
  companyNumber: string;
  internationalNumber?: any;
  shortName: string;
  paths: string[];
  headerImageId?: string;
  activities: string[];
  countriesOfInterest: string[];
  companyType: string;
  billingAddress?: any;
}

export interface Pageable {}

export interface Sort {}

export interface SearchCompany {
  content: CompanyContent[];
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
