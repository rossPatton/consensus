declare type tThunk<D> = {
  readonly data: D, // response from server, or initial state
  readonly fetched?: boolean, // has fetched this endpoint at any point
  readonly error: tResponseError | null, // fetch failed for some reason
  readonly isLoading?: boolean, // fetch is currently in progress
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
