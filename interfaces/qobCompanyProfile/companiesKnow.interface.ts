import { LoadTypes } from "../../components/Icons/LoadTypeIconRender";

export interface Score {
  score?: any;
  count: number;
}

export interface Metadata {
  authorites: any[];
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

export interface CompaniesKnowInterface {
  id: number;
  created: any;
  name: string;
  shortName?: any;
  companyNumber: string;
  countryIsoCode: string;
  address?: any;
  notValidEmail?: any;
  verified: boolean;
  auto: boolean;
  clientState: string;
  rank?: any;
  virtual: boolean;
  displayName: string;
  brandName?: string;
  assignedToId: number;
  teamId: number;
  color?: any;
  weight?: any;
  flow?: any;
  score: Score;
  shipper: boolean;
  forwarder: boolean;
  carrier: boolean;
  website?: any;
  fax?: any;
  phone: string;
  billingAddress?: any;
  vat?: any;
  nationalCourtRegister?: any;
  founded?: any;
  employees?: any;
  numberOfDivisions?: any;
  about?: any;
  ftl: boolean;
  imageId?: any;
  headerImageId?: any;
  type: keyof typeof LoadTypes;
  countriesOfInterest: any[];
  activities: any[];
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
