const types = [
  "SRL",
  "PFA",
  "II",
  "IF",
  "SA",
  "SRL-D",
  "ONG",
  "SCS",
  "ЧУП",
  "SCA",
  "SNC",
  "SE",
  "RA",
  "GEIE",
  "ОДО",
  "ÎI",
  "GIE",
  "SCE",
  "SC",
  "CA",
  "F",
  "SS",
  "SR",
  "ПАО",
  "АО",
  "ОАО",
  "УП",
  "ЗАО",
  "UAB",
  "AB",
  "SOCIETATEA",
  " CU",
  "RASPUNDERE",
  "LIMITATA",
  "KUB",
  "GMBH",
  "UG",
  "AG",
  "KGAA",
  "SE",
  "LTD",
  "ПП",
  "GBR",
  "OHG",
  "KG",
  "SP Z OO",
  "PARTNG",
  "SP",
  "FUH",
  "ФОП",
  "SRO",
  "ВКФ",
  "ГО",
  "ООО",
  "ТОВ",
  "ФЛП",
  "БО",
  "ИП",
  "ТЗОВ",
  "ТК",
  "ЧТУП",
];

export const getInitials = (name: string) => {
  const nameArr = name
    ?.replaceAll('"', "")
    ?.replaceAll(".", "")
    ?.replaceAll('"', "")
    ?.replaceAll("«", "")
    ?.replaceAll("»", "")
    ?.split(/\s+/)
    ?.filter(
      (subName) => !types.includes(subName?.toLocaleUpperCase()) && subName
    );
  return nameArr
    ?.map((w, i) => w?.substring(0, 1)?.toUpperCase())
    ?.join("")
    ?.substr(0, 2)
    ?.toLocaleUpperCase();
};
