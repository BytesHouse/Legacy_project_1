export const addressEditor = (str: string) =>
  str.replace(/,,+/g, ",").replace(/^,|,$/g, "");
