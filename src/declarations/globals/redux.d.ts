declare type tThunk<D> = {
  readonly data: D,
  readonly error: tResponseError | null,
  readonly isLoading?: boolean,
};

declare type tAction<T, P = undefined> = {
  readonly type: T,
  readonly payload?: P,
};

declare type tActionPayload<P = any> = {
  readonly type: string,
  readonly payload?: P,
};

declare type tThunkPayload<P = any> = Promise<{
  readonly type: string,
  readonly payload?: P,
}>;
