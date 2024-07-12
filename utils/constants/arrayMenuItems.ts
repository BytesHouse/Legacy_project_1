const companyArr = [
  { href: "/about", text: "about_us" },
  { href: "https://qoobus.com/en/news", text: "news" },
  { href: "https://qoobus.com/en/brand", text: "media_brand" },
];

const shippersArr = [
  { href: "https://qoobus.com/en/shipper#why", text: "why_qoobus" },
  { href: "https://qoobus.com/en/shipper#how", text: "how_it_works" },
  { href: "https://qoobus.com/en/shipper#vision", text: "vision" },
];

const carriersArr = [
  { href: "https://qoobus.com/en/carrier#why", text: "why_qoobus" },
  { href: "https://qoobus.com/en/carrier#how", text: "how_it_works" },
  { href: "https://qoobus.com/en/carrier#vision", text: "vision" },
];

const moreArr = [
  { href: "https://qoobus.com/en/faq", text: "faq" },
  { href: "https://qoobus.com/en/legal", text: "privacy_legal" },
  { href: "https://qoobus.com/en/academy", text: "Academy" },
  { href: "/archive", text: "companies_archive" },
  { href: "/search/customs", text: "customs_archive" },
  { href: "https://qoobus.com/en/contact", text: "contact_us" },
];

const moreArrSearch = [
  { href: "https://qoobus.com/en/faq", text: "faq" },
  { href: "https://qoobus.com/en/legal", text: "privacy_legal" },
  { href: "https://qoobus.com/en/contact", text: "contact_us" },
];

export const arrayItems = [
  { text: "company", href: "", items: companyArr },
  { text: "shippers", href: "", items: shippersArr },
  { text: "carriers", href: "", items: carriersArr },
  { text: "more", href: "", items: moreArr },
];

export const arraySearch = [
  { text: "home", href: "/" },
  { text: "company", href: "", items: companyArr },
  { text: "shippers", href: "", items: shippersArr },
  { text: "carriers", href: "", items: carriersArr },
  { text: "Academy", href: "https://qoobus.com/en/academy" },
  { text: "companies_archive", href: "/archive" },
  { text: "customs_archive", href: "/search/customs" },
  { text: "more", href: "", items: moreArrSearch },
];

export const arrayHeader = [{ text: "home", href: "/" }, ...arrayItems];
