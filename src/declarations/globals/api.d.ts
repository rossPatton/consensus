// typical generic id-based db query, client side
declare type tBaseQuery = {
  // exclude an id, or something else
  exclude?: number,
  limit?: number,
  offset?: number,
}

declare type tIdQuery = tBaseQuery & {
  id: string | number,
}

declare type tApiOpts = {
  dispatch: Function,
  credentials?: boolean,
  failure: Function,
  method?: 'DELETE' | 'GET' | 'PATCH' | 'POST',
  path: string,
  success: (json: any) => any,
  query?: any,
}

declare type tResponseError = {
  message: string;
  status: 200 | 204 | 400 | 500;
};
