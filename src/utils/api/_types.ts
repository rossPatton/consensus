export type tApiOpts = Readonly<{
  dispatch?: Function,
  credentials?: boolean,
  failure?: (error: ts.responseError) => ts.action<string, ts.responseError>,
  init?: () => ts.action<string, any>,
  method?: 'DELETE' | 'GET' | 'PATCH' | 'POST',
  path: string,
  // TODO instead of string or any, could do a union of action types and payloads
  // might be a pain
  success?: (payload: any) => ts.action<string, any>,
  query?: object,
}>;
