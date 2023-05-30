export function numberToText(n: number) {
  if (n === 1) return "one";
  if (n === 2) return "two";
  if (n === 3) return "tree";
  return n;
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
