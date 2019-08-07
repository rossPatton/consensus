// useful when filtering sparse arrays
export const notNull = function<T>(x: T | null): x is T {
  return x !== null;
};
