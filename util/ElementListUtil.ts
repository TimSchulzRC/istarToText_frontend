/**
 * A function that returns a boolean indicating whether the element at the specified index is not the first or last element in a list of the specified count.
 *
 * @param index - The index of the element.
 * @param count - The count of elements in the list.
 * @returns A boolean indicating whether the element is not the first or last element in the list.
 */
export function elementIsNotFirstOrLast(index: number, count: number) {
  return count > 1 && index > 0 && index < count - 2;
}

/**
 * A function that returns a boolean indicating whether the element at the specified index is the last element in a list of the specified count.
 *
 * @param index - The index of the element.
 * @param count - The count of elements in the list.
 * @returns A boolean indicating whether the element is the last element in the list.
 */
export function elementIsLast(index: number, count: number) {
  return index > 0 && index === count - 1;
}
