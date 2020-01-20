declare type tThunk<D> = {
  readonly error?: Error | null,
  readonly data: D,
  readonly isLoading?: boolean,
};

declare type tAction<T, P = undefined> = {
  readonly type: T,
  readonly payload?: P,
};
