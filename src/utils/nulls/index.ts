// useful when filtering sparse arrays
export const notNull = function<T>(x: T | null): x is T {
  return x !== null;
};

// useful when checking null
export const isNull = function<T>(x: T | null): x is null {
  return x === null;
};
