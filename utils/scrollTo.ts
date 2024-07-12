export const scrollTo = (selector: string, yOffset = 0) => {
  const el = document.getElementById(selector);
  if (!el) {
    return;
  }
  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
};
