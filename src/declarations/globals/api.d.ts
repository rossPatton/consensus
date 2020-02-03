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
  readonly dispatch: Function,
  readonly credentials?: boolean,
  readonly failure: Function,
  readonly init?: Function,
  readonly method?: 'DELETE' | 'GET' | 'PATCH' | 'POST',
  readonly path: string,
  readonly success: (json: any) => any,
  readonly query?: any,
}

declare type tResponseError = {
  message: string;
  status: 200 | 204 | 400 | 500;
};
