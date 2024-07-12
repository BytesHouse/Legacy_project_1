export const boldStringQuery = (
  str: string,
  substr: string,
  color: string = "text-c-blue"
) => {
  if (!substr) {
    return str;
  }
  const reg = new RegExp(substr, "g");
  return str
    ?.toString()
    .replace(
      reg,
      `<span class="${color} ${color ? "cursor-pointer" : ""}">${substr}</span>`
    );
};
