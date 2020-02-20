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

// basic id query
declare type tIdQuery = tBaseQuery & {
  id: string | number,
};

declare type tApiOpts = Readonly<{
  dispatch?: Function,
  credentials?: boolean,
  failure?: Function,
  init?: Function,
  method?: 'DELETE' | 'GET' | 'PATCH' | 'POST',
  path: string,
  success?: (json: any) => any,
  query?: any,
}>;

declare type tResponseError = Readonly<{
  message: string;
  status: 200 | 204 | 400 | 500;
}>;
