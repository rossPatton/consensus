// convert date string from inputs to tuple of numbers
// first value is hour, second value is minutes
export const parseTimeString = (s: string) => s
  .split(/(:){1}/)
  .map(Number)
  .filter(s => !isNaN(s));
