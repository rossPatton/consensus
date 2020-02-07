declare type tThunk<D> = Readonly<{
   data: D, // response from server, or initial state
   fetched?: boolean, // has fetched this endpoint at any point
   error: tResponseError | null, // fetch failed for some reason
   isLoading?: boolean, // fetch is currently in progress
}>;

declare type tAction<T, P = undefined> = Readonly<{
   type: T,
   payload?: P,
}>;

declare type tActionPayload<P = any> = Readonly<{
   type: string,
   payload?: P,
}>;

declare type tThunkPayload<P = any> = Promise<Readonly<{
   type: string,
   payload?: P,
}>>;
