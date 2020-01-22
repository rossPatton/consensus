declare type tThunk<D> = {
  readonly error?: Error | null,
  readonly data: D,
  readonly isLoading?: boolean,
};

declare type tAction<T, P = undefined> = {
  readonly type: T,
  readonly payload?: P,
};

declare type tActionReturn<P = any> = {
  readonly type: string,
  readonly payload?: P,
};

declare type tThunkReturn<P = any> = Promise<{
  readonly type: string,
  readonly payload?: P,
}>;
