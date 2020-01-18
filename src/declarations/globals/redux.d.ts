declare interface tThunk<D> {
  error?: Error | null,
  data: D,
  isLoading?: boolean,
};

declare interface tAction<T, P = undefined> {
  type: T,
  payload?: P,
};
