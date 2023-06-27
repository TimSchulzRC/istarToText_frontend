/**
 * A function that returns the text representation of a number.
 *
 * @param n - The number to convert to text.
 * @returns The text representation of the number.
 */
export function numberToText(n: number) {
  if (n === 1) return "";
  if (n === 2) return "two";
  if (n === 3) return "tree";
  if (n === 4) return "four";
  if (n === 5) return "five";
  if (n === 6) return "six";
  if (n === 7) return "seven";
  if (n === 8) return "eight";
  if (n === 9) return "nine";
  if (n === 10) return "ten";
  if (n === 11) return "eleven";
  if (n === 12) return "twelve";
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
