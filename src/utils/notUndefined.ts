// useful when filtering sparse arrays
export const notUndefined = function<T>(x: T | undefined): x is T {
  return typeof x !== 'undefined';
};
