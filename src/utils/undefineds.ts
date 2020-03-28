// useful when filtering sparse arrays
export const notUndefined = function<T>(x: T | undefined): x is T {
  return typeof x !== 'undefined';
};

// useful when checking undefineds
export const isUndefined = function<T>(x: T | undefined): x is undefined {
  return typeof x === 'undefined';
};
