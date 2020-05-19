namespace ts {
  declare type thunk<D> = Readonly<{
    data: D, // response from server, or initial state
    fetched?: boolean, // has fetched this endpoint at any point
    error: ts.responseError | null, // fetch failed for some reason
    isLoading?: boolean, // fetch is currently in progress
  }>;

  declare type action<T, P = undefined> = Readonly<{
    type: T,
    payload?: P,
  }>;

  declare type payload<P = any> = Readonly<{
    type: string,
    payload?: P,
  }>;

  declare type thunkPayload<P = any> = Promise<Readonly<{
    type: string,
    payload?: P,
  }>>;

  declare type upload = Readonly<{
    [key: string]: string,
  }>;
}
