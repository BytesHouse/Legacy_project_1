export interface Score {
  score: number;
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
  lastCheckinStamp: number;
  dsc?: any;
  stateChanged: number;
}

export interface Company {
  id: number;
  created: number;
  name: string;
  shortName: string;
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
  founded: number;
  employees?: any;
  numberOfDivisions?: any;
  about: string;
  ftl: boolean;
  imageId: string;
  headerImageId: string;
  type: string;
  countriesOfInterest: string[];
  activities: string[];
  truckParkSize: string;
  trucks: any[];
  followersSize?: any;
  lastCheckinStamp: number;
  infinium: boolean;
  refId?: any;
  twitter: string;
  facebook: string;
  linkedin?: any;
  skype: string;
  telegram?: any;
  whatapp?: any;
  viber: string;
  secondaryEmail?: any;
  secondaryPhone: string;
  metadata: Metadata;
  count: number;
  linkedId?: any;
  source?: any;
}

export interface Metadata2 {
  authorites: string[];
  enabled: boolean;
  deleted: boolean;
}

export interface UserProfile {
  id: number;
  created: number;
  notValidEmail?: any;
  phone: string;
  displayName: string;
  uuid: string;
  trackingId: string;
  company: Company;
  title?: any;
  firstName: string;
  lastName: string;
  mobile: string;
  gender?: any;
  birthday: number;
  url?: any;
  position: string;
  department: string;
  imageId: string;
  headerImageId?: any;
  preferredCurrency: string;
  preferredLanguage: string;
  websocketSessionId: string;
  spokenLanguages: string[];
  connectionsSize: number;
  followersSize: number;
  lastCheckinStamp: number;
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
