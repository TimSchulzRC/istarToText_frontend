/**
 * A function that returns the text representation of a number.
 *
 * @param n - The number to convert to text.
 * @returns The text representation of the number.
 */
export function numberToText(n: number) {
  if (n === 1) return "one";
  if (n === 2) return "two";
  if (n === 3) return "tree";
  return n;
}

/**
 * A function that capitalizes the first letter of a string.
 *
 * @param string - The string to capitalize.
 * @returns The string with the first letter capitalized.
 */
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
