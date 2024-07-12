export interface AdditionalData {
    qoobus: boolean;
}

export interface Translation {
    en: string;
    ro: string;
    ru: string;
}

export interface Source {
    url: string;
    name: string;
}

export interface Country {
    name: string;
    code: string;
    translation: Translation;
    sources: Source[];
}

export interface Translation2 {
    en: string;
    ro: string;
    ru: string;
}

export interface Type {
    type: string;
    translation: Translation2;
}

export interface FinancialReport {
    year: number;
    employees: number;
    turnover?: any;
    profit: number;
    debt: number;
    equityOwnership: number;
    fixedAssets: number;
    currentAssets: number;
    taxes?: any;
    profitWithoutTax: number;
    assets: number;
    netProfit: number;
    debtLongTerm: number;
    netTurnover: number;
}

export interface Translation3 {
    en: string;
    ro: string;
    ru: string;
}

export interface Status {
    providerName: string;
    translation: Translation3;
}

export interface Company {
    internationalNumber: string;
    name: string;
    shortName: string;
    brandName: string;
    paths: string[];
}

export interface Address {
    address: string;
    companies: Company[];
}

export interface Translation4 {
    en: string;
    ro: string;
    ru: string;
}

export interface Translation5 {
    en: string;
    ro: string;
    ru: string;
}

export interface Type2 {
    id: number;
    name: string;
    translation: Translation5;
}

export interface Activity {
    providerName: string;
    translation: Translation4;
    type: Type2;
}

export interface Person2 {
    name: string;
    occupation?: any;
    nationality?: any;
    birthYear?: any;
    birthMonth?: any;
    birthDate?: any;
    address?: any;
    countryOfResidence?: any;
    honorific?: any;
}

export interface Translation6 {
    en: string;
    ro: string;
    ru: string;
}

export interface Role {
    name: string;
    translation: Translation6;
}

export interface Company2 {
    internationalNumber: string;
    name: string;
    brandName: string;
    shortName: string;
    paths: string[];
}

export interface Person {
    amount?: any;
    percentage?: number;
    appointedOn?: any;
    resignedOn?: any;
    shares?: any;
    person: Person2;
    role: Role;
    companies: Company2[];
}

export interface Translation7 {
    en: string;
    ro: string;
    ru: string;
}

export interface Role2 {
    id: number;
    name: string;
    translation: Translation7;
}

export interface Participant {
    name: string;
    shortName: string;
    brandName: string;
    internationalNumber: string;
    localNumber: string;
    europeanNumber?: any;
    dateCreated: string;
    dateDisolved?: any;
    alternateNames: any[];
    countryCode: string;
    role: Role2;
}

export interface CourtCas {
    id: number;
    issuerId?: number;
    debtorId?: number;
    judge: string;
    amount?: any;
    date: string;
    caseNumber: string;
    decision?: any;
    countryId: number;
    file: string;
    createdAt: Date;
    courtType: string;
    reason: string;
    html?: any;
    decisionNumber?: any;
    decisionForm?: any;
    effectiveDate?: any;
    courtName?: any;
    department?: any;
    proceduralStage?: any;
    participants: Participant[];
}

export interface Subdivision {
    id: number;
    address: string;
    type: string;
    locality: string;
    companyId: number;
    date?: any;
    number?: any;
    name?: any;
    status?: any;
    space?: any;
    phones: any[];
    emails: any[];
}

export interface Translation8 {
    en: string;
    ro: string;
    ru: string;
}

export interface Type3 {
    id: number;
    name: string;
    translation: Translation8;
}

export interface Event {
    id: number;
    companyId: number;
    typeId: number;
    oldValue: string;
    newValue: string;
    date: string;
    type: Type3;
}

export interface FromCompany {
    name: string;
    shortName: string;
    brandName: string;
    internationalNumber: string;
    countryCode: string;
    paths: string[];
}

export interface ToCompany {
    name: string;
    shortName: string;
    brandName: string;
    internationalNumber: string;
    countryCode: string;
}

export interface ExternalReview {
    isPositive: boolean;
    isNegative: boolean;
    isNeutral: boolean;
    rating: number;
    ratingTotal: number;
    reviewDate: string;
    reviewText: string;
    fromCompany: FromCompany;
    toCompany: ToCompany;
}

export interface Score {
    score: number;
    count: number;
}

export interface Score2 {
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

export interface Company3 {
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
    color: string;
    weight?: any;
    flow?: any;
    score: Score2;
    shipper: boolean;
    forwarder: boolean;
    carrier: boolean;
    website: string;
    fax?: any;
    phone: string;
    billingAddress: string;
    vat?: any;
    nationalCourtRegister?: any;
    founded: number;
    employees?: any;
    numberOfDivisions?: any;
    about?: any;
    ftl: boolean;
    imageId?: string;
    headerImageId?: string;
    type: string;
    countriesOfInterest: string[];
    activities: any;
    truckParkSize: string;
    trucks: string[];
    followersSize?: any;
    lastCheckinStamp: number;
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

export interface QoobusProfile {
    name: string;
    shortName: string;
    about?: string;
    id?: number;
    brandName: string;
    internationalNumber: string;
    localNumber: string;
    europeanNumber?: any;
    dateCreated: Date;
    dateDisolved?: any;
    alternateNames: any[];
    address: string;
    hasPublicDebt: boolean;
    paysVat: boolean;
    vatNumber?: any;
    vatDate?: any;
    vatCancelDate?: any;
    paysExcise: boolean;
    exciseNumber?: any;
    exciseDate?: any;
    exciseCancelDate?: any;
    additionalData: AdditionalData;
    fax?: any;
    websites: any[];
    contacts: any[];
    phones: any[];
    publicDebtAmount?: any;
    subscribedShareCapital?: any;
    paidShareCapital?: any;
    terms?: any;
    annualAssembly?: any;
    endDateFinancialYear?: any;
    currentEmployeesNumber?: any;
    updatedAt: Date;
    country: Country;
    type: Type;
    financialReports: FinancialReport[];
    statuses: Status[];
    addresses: Address[];
    activities: Activity[];
    persons: Person[];
    courtCases: CourtCas[];
    licenses: any[];
    internationalTransportCountryPermits: any[];
    permits: any[];
    subdivisions: Subdivision[];
    insolvencies: any[];
    events: Event[];
    externalReviews: ExternalReview[];
    companyTransports: any[];
    score: Score;
    company: Company3;
    paths: string[];
}
