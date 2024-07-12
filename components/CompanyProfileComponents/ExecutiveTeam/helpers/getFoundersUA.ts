import { FounderInterface } from "./../../../../utils/getStatus";

export const getFoundersUA = (
  founders: FounderInterface[],
  authorizedCapital?: string
) => {
  let foundersToRender: FounderInterface[] = [...founders];
  if (+authorizedCapital!.replace(",", ".") && founders.length) {
    foundersToRender = founders
      .filter((founder) => founder.name)
      .map((founder) => {
        const totalCapital = +authorizedCapital!.replace(",", ".");

        const stake = founder.stake
          ? +founder.stake
              .split("")
              .filter((symb) => !Number.isNaN(+symb) || symb === ",")
              .join("")
              .trim()
              .replace(",", ".")
          : 0;
        const shares = (stake / totalCapital) * 100;
        const newFounder = { shares: shares.toFixed(2), name: founder.name };
        return newFounder;
      });
  } else if (authorizedCapital === "0,00" || authorizedCapital === "") {
    foundersToRender = founders
      .filter((founder) => founder.name)
      .map((founder) => {
        const shares = `-`;
        const newFounder = { shares, name: founder.name };
        return newFounder;
      });
  }
  return foundersToRender.map((founder) => ({
    ...founder,
    name: founder.name.toLowerCase(),
  }));
};
