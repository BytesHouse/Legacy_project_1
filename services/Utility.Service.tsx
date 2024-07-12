import slugify from "slugify";
import { transliterate } from "transliteration";

export class UtilityService {
  /**
   *
   * @param {string} text
   * @param {string} code
   */
  static tr(text: any, code: number) {
    const ignoreTr = {
      ru: [
        "А",
        "Б",
        "В",
        "Г",
        "Д",
        "Е",
        "Ё",
        "Ж",
        "З",
        "И",
        "Й",
        "К",
        "Л",
        "М",
        "Н",
        "О",
        "П",
        "Р",
        "С",
        "Т",
        "У",
        "Ф",
        "Х",
        "Ц",
        "Ч",
        "Ш",
        "Щ",
        "Ъ",
        "Ы",
        "Ь",
        "Э",
        "Ю",
        "Я",
        "Є",
        "Ї",
        "а",
        "б",
        "в",
        "г",
        "д",
        "е",
        "ё",
        "ж",
        "з",
        "и",
        "й",
        "к",
        "л",
        "м",
        "н",
        "о",
        "п",
        "р",
        "с",
        "т",
        "у",
        "ф",
        "х",
        "ц",
        "ч",
        "ш",
        "щ",
        "ъ",
        "ы",
        "ь",
        "э",
        "ю",
        "я",
        "є",
        "ї",
      ],
      ro: ["Ă", "ă", "Â", "â", "Î", "î", "Ș", "ș", "Ț", "ț"],
    };
    // @ts-ignore
    return transliterate(text, { ignore: ignoreTr[code] });
  }

  static getSlugB2B({ name, shortName, brandName, internationalNumber }: any) {
    const shortN = shortName ? shortName.replace(/[*+~.()'"”“!:@]/g, "") : null;
    const brandN = brandName ? brandName.replace(/[*+~.()'"”“!:@]/g, "") : null;
    const nameN = name ? name.replace(/[*+~.()'"”“!:@]/g, "") : null;
    const title = shortN || brandN || nameN || "";
    return `${slugify(title.replace(/[*+~.()'"”“!:@]/g, ""), {
      lower: true,
    })}-${encodeURIComponent(internationalNumber)}`;
  }

  static getSlug({ name, shortName, brandName, internationalNumber }: any) {
    const shortN = shortName ? shortName.replace(/[*+~.()'"”“!:@]/g, "") : null;
    const brandN = brandName ? brandName.replace(/[*+~.()'"”“!:@]/g, "") : null;
    const nameN = name ? name.replace(/[*+~.()'"”“!:@]/g, "") : null;
    const title = shortN || brandN || nameN || "";
    return `${slugify(title.replace(/[*+~.()'"”“!:@]/g, ""), {
      lower: true,
    })}-__-${encodeURIComponent(internationalNumber)}`;
  }

  static getSlugCustom({ name, nameAddress, customId }: any) {
    const nameA = nameAddress
      ? nameAddress.replace(/[*+~.()'"”“!:@]/g, "")
      : null;
    const nameN = name ? name.replace(/[*+~.()'"”“!:@]/g, "") : null;
    const title = nameN || nameA || "";
    return `${slugify(title.replace(/[*+~.()'"”“!:@]/g, ""), {
      lower: true,
    })}-__-${encodeURIComponent(customId)}`;
  }

  /**
   *
   * @param {any} value
   */
  static abbreviate(value: number) {
    if (Math.abs(value) < 100) {
      return value;
    }
    let newValue = value;
    const suffixes = ["", "K", "M", "B", "T"];
    let suffixNum = 0;
    while (Math.abs(newValue) >= 1000) {
      newValue /= 1000;
      suffixNum++;
    }
    newValue = Number(newValue.toPrecision(3));
    newValue += Number(suffixes[suffixNum]);
    return newValue;
  }

  /**
   *
   * @param {number} value
   */
  static numberWithCommas(value: { toString: () => string }) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /**
   *
   * @param {any} value
   */
  static setCount(value: number) {
    if (value < 1000) {
      return value;
    }

    return `999+`;
  }

  /**
   *
   * @param {string} value
   */
  static capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.substring(1).toLowerCase();
  }
}

/**
 * @param {any} value
 */
export function isObject(value: { constructor: ObjectConstructor }) {
  return value && typeof value === "object" && value.constructor === Object;
}

const URL_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gm;

function normalizeURL(url: string) {
  return url.match(/http|https/g) ? url : `http://${url}`;
}

export function getUrl(text: string) {
  if (!text) return null;
  const res = text.match(URL_REGEX);
  return res ? res.map(normalizeURL) : null;
}
