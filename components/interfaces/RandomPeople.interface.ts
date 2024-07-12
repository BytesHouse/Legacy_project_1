export interface Score {
  score?: number;
  count: number;
}

export interface Metadata {
  authorites: string[];
  partner: boolean;
  quickPay: boolean;
  paymentGuaranteed: boolean;
  cargoOwner: boolean;
  customsBroker: boolean;
  warehouseServiceProvider: boolean;
  enabled: boolean;
  deleted: boolean;
  lastCheckinStamp?: any;
  dsc?: any;
  stateChanged: any;
}

export interface Company {
  id: number;
  created: any;
  name: string;
  shortName?: any;
  companyNumber: string;
  countryIsoCode: string;
  address: string;
  notValidEmail?: any;
  verified: boolean;
  auto: boolean;
  clientState: string;
  rank?: any;
  virtual: boolean;
  displayName: string;
  assignedToId: number;
  teamId: number;
  color?: any;
  weight?: any;
  flow?: any;
  score: Score;
  shipper: boolean;
  forwarder: boolean;
  carrier: boolean;
  website: string;
  fax?: any;
  phone: string;
  billingAddress: string;
  vat: string;
  nationalCourtRegister?: any;
  founded: any;
  employees?: any;
  numberOfDivisions?: any;
  about: string;
  ftl: boolean;
  imageId?: any;
  headerImageId?: any;
  type: string;
  countriesOfInterest: any[];
  activities: string[];
  truckParkSize: string;
  trucks: any[];
  followersSize?: any;
  lastCheckinStamp?: any;
  infinium: boolean;
  refId?: any;
  twitter?: any;
  facebook?: any;
  linkedin?: any;
  skype?: any;
  telegram?: any;
  whatapp?: any;
  viber?: any;
  secondaryEmail?: any;
  secondaryPhone?: any;
  metadata: Metadata;
  count: number;
  linkedId?: number;
  source?: any;
}

export interface Metadata2 {
  authorites: string[];
  enabled: boolean;
  deleted: boolean;
}

export interface RandomPeople {
  id: number;
  created: any;
  notValidEmail?: any;
  phone: string;
  displayName: string;
  uuid: string;
  trackingId?: any;
  company: Company;
  title?: any;
  firstName: string;
  lastName: string;
  mobile: string;
  gender?: any;
  birthday: any;
  url?: any;
  position: string;
  department: string;
  imageId?: any;
  headerImageId?: any;
  preferredCurrency: string;
  preferredLanguage: string;
  websocketSessionId: string;
  spokenLanguages: string[];
  connectionsSize?: any;
  followersSize?: any;
  lastCheckinStamp?: number;
  enabled: boolean;
  admin: boolean;
  twitter?: any;
  facebook?: any;
  linkedin?: any;
  skype?: any;
  telegram?: any;
  whatapp?: any;
  viber?: any;
  secondaryEmail?: any;
  secondaryPhone?: any;
  metadata: Metadata2;
  count: number;
  teams?: any;
  hasEmail: boolean;
}
