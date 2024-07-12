export interface Attachment {
    created: number;
    registratedDate: number;
    modified: number;
    id: string;
    server: string;
    path: string;
    originalName: string;
    extension: string;
    permission: string;
    uploadedDate: number;
    description?: any;
    size: number;
    mimeType: string;
    scope: string;
}

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
    lastCheckinStamp: any;
    dsc?: any;
    stateChanged: any;
}

export interface ToCompany {
    id: number;
    created: any;
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
    color: string;
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
    vat?: any;
    nationalCourtRegister?: any;
    founded: any;
    employees?: any;
    numberOfDivisions?: any;
    about?: any;
    ftl: boolean;
    imageId?: any;
    headerImageId?: any;
    type: string;
    countriesOfInterest: string[];
    activities: string[];
    truckParkSize: string;
    trucks: string[];
    followersSize?: any;
    lastCheckinStamp: any;
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
    linkedId?: any;
    source?: any;
}

export interface Score2 {
    score?: any;
    count: number;
}

export interface Metadata2 {
    authorites: string[];
    partner: boolean;
    quickPay: boolean;
    paymentGuaranteed: boolean;
    cargoOwner: boolean;
    customsBroker: boolean;
    warehouseServiceProvider: boolean;
    enabled: boolean;
    deleted: boolean;
    lastCheckinStamp: any;
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
    address?: any;
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
    score: Score2;
    shipper: boolean;
    forwarder: boolean;
    carrier: boolean;
    website?: any;
    fax?: any;
    phone: string;
    billingAddress: string;
    vat?: any;
    nationalCourtRegister?: any;
    founded?: any;
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
    lastCheckinStamp: any;
    infinium: boolean;
    refId?: any;
    twitter: string;
    facebook: string;
    linkedin: string;
    skype: string;
    telegram: string;
    whatapp: string;
    viber: string;
    secondaryEmail: string;
    secondaryPhone: string;
    metadata: Metadata2;
    count: number;
    linkedId?: any;
    source?: any;
}

export interface Metadata3 {
    authorites: string[];
    enabled: boolean;
    deleted: boolean;
}

export interface FromUser {
    id: number;
    created: any;
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
    lastCheckinStamp: any;
    enabled: boolean;
    admin: boolean;
    twitter: string;
    facebook: string;
    linkedin: string;
    skype: string;
    telegram: string;
    whatapp: string;
    viber: string;
    secondaryEmail: string;
    secondaryPhone: string;
    metadata: Metadata3;
    count: number;
    teams?: any;
    hasEmail: boolean;
}

export interface ToScore {
    score: number;
    count: number;
}

export interface FromScore {
    score?: any;
    count: number;
}

export interface Content {
    id: number;
    created: any;
    score: number;
    offer?: any;
    comment: string;
    attachments: Attachment[];
    reasons: string[];
    fromCompany?: any;
    fromVirtualCompany?: any;
    toCompany: ToCompany;
    toVirtualCompany?: any;
    fromUser: FromUser;
    checksum?: any;
    likes: number;
    dislikes: number;
    liked: boolean;
    disliked: boolean;
    viewer?: any;
    b2bCurtId?: any;
    commentsCount: number;
    toScore: ToScore;
    fromScore: FromScore;
}

export interface Pageable {
}

export interface Sort {
}

export interface FeedBacksInterface {
    content: Content[];
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
