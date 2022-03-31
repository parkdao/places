function unitify(rule: string, value: any) {
  if (typeof value === "number") return "px";
  return "";
}
export function css(style) {
  return Object.keys(style).reduce(
    (acc, key) =>
      acc +
      key
        .split(/(?=[A-Z])/)
        .join("-")
        .toLowerCase() +
      ":" +
      style[key] +
      unitify(key, style[key]) +
      ";",
    ""
  );
}
