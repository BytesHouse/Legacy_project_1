import { CompanyInterface } from "./getStatus";

const liquidationStatusFlags = [
  "Принятие юридическим лицом решения о ликвидации и назначении ликвидатора",
  "Принятие юридическим лицом решения о ликвидации и формирование ликвидационной комиссии, назначение ликвидатора",
];
const activeStatusFlags = [
  "Истечение срока ликвидации общества с ограниченной ответственностью",
];

export const getIsStatusActive = (company: CompanyInterface) => {
  let isActive = true;
  if (
    company.events?.some((event) =>
      liquidationStatusFlags.some((flag) => flag === event.reason)
    )
  ) {
    const allEvents = company.events?.map((event) => event.reason);
    const lastLiquidationEventIndex = allEvents
      .map((item) => liquidationStatusFlags.some((flag) => flag === item))
      .lastIndexOf(true);
    const lastActiveEventIndex = allEvents
      .map((item) => activeStatusFlags.some((flag) => flag === item))
      .lastIndexOf(true);
    isActive = lastLiquidationEventIndex < lastActiveEventIndex;
  }

  if (company.status === "припинено") {
    isActive = false;
  }
  if (company.liquidationDate) {
    isActive = false;
  }
  return isActive;
};
