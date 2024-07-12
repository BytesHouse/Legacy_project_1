import { MomentInput } from "moment";
import { CompanyDataInterface } from "../pages/activity";

export interface RussianCompanyEventsInterface {
  date: string;
  institution: string;
  reason: string;
}

export interface TaxesInterface {
  year?: number;
  fixed_assets?: string;
  current_assets?: string;
  total_assets?: string;
  equity_ownership?: string;
  debt?: string;
  total_debt?: string;
  long_term_debt?: string;
  net_sales?: string;
  profit?: string;
  total_profit?: string;
  profit_before_tax?: string;
  net_profit_management_period?: string;
  employees?: string;
  total_provisions?: string;
  total_own_capital?: string;
  total_current_debt?: string;
  total_long_term_debt?: string;
  total_share_capital_unregistered?: string;
  total_tangible_assets?: string;
  total_intangible_assets?: string;
  total_stocks?: string;
  total_long_term_financial_investments?: string;
  total_current_financial_investments?: string;
  total_current_receivables_and_other_current_assets?: string;
  total_long_term_receivables_and_other_fixed_assets?: string;
  total_reserves?: string;
  total_sales_income?: string;
  total_cost_of_sales?: string;
  cost_of_sales?: string;
  gross_profit?: string;
  other_income_from_operational_activity?: string;
  distribution_costs?: string;
  administrative_costs?: string;
  other_expenses_from_the_operational_activity?: string;
  profit_resulting_from_operational_activity?: string;
  financial_profit_result?: string;
  profit_operations_fixed_exceptional_assets?: string;
  income_tax_expenses?: string;
  stocks?: string;
  cash_money_documents?: string;
  current_receivables_and_other_current_assets?: string;
  registered_and_unregistered_capital?: string;
  tangible_assets?: string;
  other_equity_items?: string;
  long_term_financial_investments?: string;
  reservations?: string;
  intangible_assets?: string;
  current_financial_investments?: string;
}

export interface CompanyDataExchangeInterface {
  authorityCode: string;
  authorityName: string;
  startDate: string;
  taxPayerType: string | undefined;
}

export interface CompanyEventsInterface {
  nr: string;
  registrationDate: string;
  modificationDate?: string;
  name?: string;
  headquarters: string;
  administrator: string;
  companyNumber: string;

  previousName?: string;
  newName?: string;

  previousHeadquarters?: string;
  newHeadquarters?: string;
  deletionDate?: string;
}

export type CompanyEventProperty =
  | "newName"
  | "newHeadquarters"
  | "previousName"
  | "previousHeadquarters";

export interface FounderInterface {
  name: string;
  shares: string;
  stake?: string;
  createdAt?: string;
  fullName?: string;
  companyName?: string;
  idnp?: string;
  shareSize?: { amount: number; units: string };
  shareValue?: { amount: number; units: string };
}

export interface ActivityInterface {
  code?: string;
  id: string;
  name: string;
  licensed: boolean;

  primary?: string;
  caem?: string;
  caemVer?: string;
}

export interface ActivitiesInterfaceRus {
  id?: string;
  code: string;
  createdAt: string;
  name: string;
}

export interface ActivitiesInterface {
  code?: string;
  name: string;
  id: string;
}

export interface AnualReport {
  activity: string;
  totalCosts: string;
  capitals: string;
  bankAccounts: string;
  netTurnover: string;
  grossIncome: string;
  currentAssets: string;
  "cifra de afaceri neta": string;
  "venituri totale": string;
  "cheltuieli totale": string;
  "active circulante - total, din care": string;
  "casa si conturi la banci": string;
  "-profit net": string;
  "-profit brut": string;
  "-pierdere brut": string;
  "-pierdere net": string;
  fixed_assets: string;
  total_assets: string;
  subscribedCapital: string;
  datorii: string;
  netLoss: string;
  creante: string;
  debts: string;
  netIncome: string;
  fixedAssets: string;
  totalRevenue: string;
  grossLoss: string;
  stocks?: string;
  receivables?: string;
  prepaidExpenses?: string;
  current_assets: string;
  employees: string;
  "numar mediu de salariati": string;
  "tipul de activitate, conform clasificarii caen": string;
  prepaidIncome?: string;
  provisions?: string;
  directorPatrimony?: string;
  publicPatrimony?: string;
  year?: string | number;
}

export interface FinancialInterface {
  [x: string]: any;
  parsed?: boolean;
  address?: string;
  annualReports?: AnualReport[];
  county?: string;
  fax?: string;
  healthInsuranceContributionDate?: string;
  incomeTaxMicroCompanyDate?: string;
  insuranceContributionForWorkDate?: string;
  lastDeclarationDate?: string;
  lastProcessingDate?: string;
  localRegistrationNumber?: string;
  name?: string;
  phone?: string;
  postalCode?: string;
  socialInsuranceContributionsDate?: string;
  status?: string;
  taxOnIncomeFromWagesAndSalariesDate?: string;
}

export interface CompanyRegistrationInterface {
  createdYear?: string;
  firstDate: string;
  registrationId: string;
  secondDate: string;
}

export interface CeosInterface {
  role: string;
  name: string;
}

export interface JusticeInterface {
  id: string;
  name: string;
  pronouncementDate: string;
  registrationDate: string;
  publishingDate: string;
  judgmentType: string;
  judgmentTheme: string;
  judge: string;
  pdfUrl: string;
}

export interface SupremeCourtOfJusticeInterface {
  pdfId: string;
  number: string;
  date: string;
  partsOfJudgment: string;
  subject: string;
  problem: string;
  procedure: string;
}

export interface SubdivisionFisc {
  localityCode: string;
  locality: string;
  address: string;
}

export interface FiscInterface {
  shortName?: string[] | string;
  subdivions: SubdivisionFisc[];

  county?: string;
  tvaNumber?: string;
  tvaRegistrationDate?: string;
  tvaLiquidationDate?: string;

  exciseNumber?: string;
  exciseRegistrationDate?: string;
  exciseLiquidationDate?: string;

  debtsToTheBudget?: string;
}

export interface PensionSocial {
  createdAt: string;
  egrulDate: string;
  egrulId: string;
  issuer: string;
  registrationNumber: string;
}

export interface CompanyInterface {
  companyName?: string;
  id?: string;

  idno: string;
  beneficiaries?: any[];
  createdDate: string;

  createdDateRo?: string | FinancialInterface;
  createdYear?: string | number;
  name: string;
  country?: string;
  shortName?: string | string[];
  type: string;
  address: string;
  cuatm: string;
  ceo: string;
  contacts?: string[];
  authorizedCapital?: string;
  terminationStartedInfo?: any;
  ceos: CeosInterface[];
  companyNumber: string;
  statuses?: string[];
  status?: string;
  finances?: FinancialInterface;
  europeanNumber?: string;
  countryCode: string;
  founders: FounderInterface[];
  activities: ActivityInterface[];
  company_events: CompanyEventsInterface[];
  exchangeData?: CompanyDataExchangeInterface[];
  liquidationDate: string;
  terminatedInfo?: any;
  registration?: CompanyRegistrationInterface;
  localRegistrationNumber?: string;
  taxes: Record<string, TaxesInterface>;
  justice: JusticeInterface[];
  supreme_court: SupremeCourtOfJusticeInterface[];
  fisc: FiscInterface;
  additionalActivities?: { code: string; createdAt: string; name: string }[];
  capital?: {
    amount: number;
    createdAt: string;
    type: string;
    units: string;
  };
  lastUpdate?: MomentInput;
  lastUpdatedDate?: string;
  confidant?: {
    citizenship: string;
    createdAt: string;
    fullName: string;
    gender: string;
    idnp: string;
    position: string;
  };
  events?: RussianCompanyEventsInterface[];
  mainActivity?: {
    code: string;
    createdAt: string;
    name: string;
  };
  registeringAuthority?: {
    address: string;
    createdAt: string;
    name: string;
  };
  registrar?: {
    name: string;
  };
  pensionFound?: PensionSocial;
  socialInsurance?: PensionSocial;
}

export const getStatus = (
  company: CompanyInterface | CompanyDataInterface
): string[] => {
  // romanian
  const keyWordsLiquidated: string[] = ["radiată"];
  const keyWordsInLiquidation: string[] = [
    "dizolvare",
    "lichidare",
    "85/2014",
    "85/2006",
  ];
  const keyWordsbankruptcy: string[] = ["faliment"];
  const keyWordTemporarilyInactive: string[] = [
    "nedepus",
    "suspendare activitate expirata",
    "întrerupere",
    "expirat",
    "înmatriculare nepreschimbat",
    "reorganizare",
  ];
  const keyWordsFusionAbsorption: string[] = ["fuziune"];
  const keyWordsActive: string[] = [
    "funcțiune",
    "certificat de înmatriculare preschimbat",
  ];
  const statusesArr = company.statuses ? company.statuses : company.status;
  const companyStatuses: string = Array.isArray(statusesArr)
    ? statusesArr?.join(" ")
    : "";
  const checkMatch = (keyWords: string[], statuses: string) =>
    keyWords.some((keyWord) => {
      if (statuses.includes(keyWord)) {
        return true;
      }

      return false;
    });
  const companyStatus =
    (company.liquidationDate && "liquidated") ||
    (checkMatch(keyWordsLiquidated, companyStatuses) && "liquidated") ||
    (checkMatch(keyWordsInLiquidation, companyStatuses) && "in_liquidation") ||
    (checkMatch(keyWordsbankruptcy, companyStatuses) && "bankruptcy") ||
    (checkMatch(keyWordsActive, companyStatuses) && "active") ||
    (checkMatch(keyWordTemporarilyInactive, companyStatuses) && "inactive") ||
    (checkMatch(keyWordsFusionAbsorption, companyStatuses) &&
      "fusion_absorption") ||
    "-";
  const statusColor =
    companyStatus === "liquidated"
      ? "bg-status-red"
      : companyStatus === "in_liquidation"
      ? "bg-[#FAB543]"
      : companyStatus === "bankruptcy"
      ? "text-primary-60"
      : companyStatus === "inactive"
      ? "text-gray-60"
      : companyStatus === "fusion_absorption"
      ? "text-primary-30"
      : "bg-[#389F1E]";
  // romanian

  switch (company.countryCode) {
    case "MD":
      return company.liquidationDate
        ? ["liquidated", "bg-status-red"]
        : ["active", "bg-[#389F1E]"];
    case "RU":
      return company.status === "Inactive"
        ? ["liquidated", "bg-status-red"]
        : ["active", "bg-[#389F1E]"];
    case "UA":
      return company.status === "припинено"
        ? ["liquidated", "bg-status-red"]
        : company.status === "в стані припинення"
        ? ["in_liquidation", "bg-[#FAB543]"]
        : ["active", "bg-[#389F1E]"];
    case "RO":
      return [companyStatus, statusColor];
    default:
      return ["-", "dark-gray"];
  }
};
