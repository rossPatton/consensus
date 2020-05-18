export type tApiOpts = Readonly<{
  // @TODO make required, and make query optional
  body?: any,
  dispatch?: Function,
  credentials?: boolean,
  failure?: (error: ts.responseError) => ts.action<string, ts.responseError>,
  init?: () => ts.action<string, any>,
  method?: 'DELETE' | 'GET' | 'PATCH' | 'POST',
  path: string,
  // TODO instead of string or any, could do a union of all action types and payloads
  success?: (payload: any) => ts.action<string, any>,
  query?: object,
}>;
