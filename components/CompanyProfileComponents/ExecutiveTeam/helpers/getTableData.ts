import { getShares } from "./getShares";
import { getFoundersUA } from "./getFoundersUA";
import { FounderInterface } from "./../../../../utils/getStatus";

export const getTableData = (
  founders: FounderInterface[],
  authorizedCapital?: string
) => {
  if (!authorizedCapital?.length) {
    const foundersData = founders
      .reduce((map: any[], officer: FounderInterface) => {
        const existingRecord = map.find(
          (el) =>
            el?.name === officer?.name || el?.fullName === officer?.fullName
        );
        const shares = getShares(officer?.shares, existingRecord?.shares);
        if (existingRecord?.fullName === officer.fullName) {
          delete map[map.indexOf(existingRecord)];
        }
        map = [
          ...map,
          { ...existingRecord, ...officer, shares: shares },
        ].filter((el) => el);
        return map;
      }, [])
      .sort((a, b) => b.shares - a.shares);
    return foundersData;
  }
  return getFoundersUA(founders, authorizedCapital);
};
