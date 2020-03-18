declare interface tFetchResponse<T = any> extends Response {
  json<P = T>(): Promise<P>
};

// form submit boolean we add in middleware
declare type tFormSubmit = Readonly<{
  isFormSubmit?: boolean,
}>;

// standard db query modifiers + form submit boolean we add in middleware
declare type tBaseQuery = tFormSubmit & Readonly<{
  // exclude an id, or something else
  exclude?: number,
  limit?: number,
  offset?: number,
}>;

declare type tIdQuery = tBaseQuery & {
  id: string | number,
};

declare type tResponseError = Readonly<{
  message: tFetchResponse<Error> | string;
  status: 200 | 204 | 400 | 401 | 404 | 500;
}>;

// TODO instead of string or any, we could do a MASSIVE union of action types and payloads
declare type tApiOpts = Readonly<{
  dispatch?: Function,
  credentials?: boolean,
  failure?: (error: tResponseError) => tAction<string, tResponseError>,
  init?: () => tAction<string, any>,
  method?: 'DELETE' | 'GET' | 'PATCH' | 'POST',
  path: string,
  success?: (payload: any) => tAction<string, any>,
  query?: object,
}>;
