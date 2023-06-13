export function elementIsNotFirstOrLast(index: number, count: number) {
    return count > 1 && index > 0 && index < count - 2;
  }
  
  export function elementIsLast(index: number, count: number) {
    return index > 0 && index === count - 1;
  }
  