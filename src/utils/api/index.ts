import loglevel from 'loglevel';
import qs from 'qs';

// import {agent} from '~app/constants/agent';

import { tApiOpts } from './_types';

export const api = async (opts: tApiOpts) => {
  const { body, method = 'GET', path, query } = opts;

  const fetchOpts = {
    // agent,
    method,
  } as { [key: string]: any };
  if (opts.credentials) {
    fetchOpts.credentials = __DEV__ ? 'include' : 'same-origin';
  }
  if (body) {
    fetchOpts.body = body;
  }

  // not all api endpoints require query params
  let endpoint = path;
  if (query) {
    const queryString = qs.stringify(query, { arrayFormat: 'comma', indices: false });
    endpoint = `${path}?${queryString}`;
  }

  if (opts.init) opts.dispatch(opts.init());

  let status: ts.statusUnion;
  return fetch(endpoint, fetchOpts)
    .then((resp: ts.fetchResponse) => {
      status = resp.status as ts.statusUnion;
      if (!resp.ok) throw resp;
      return resp.json(); // we only get here if there is no error
    })
    .then(json => {
      if (opts.dispatch) return opts.dispatch(opts.success(json));
      return json;
    })
    .catch(async (err: ts.fetchResponse<Error> | string) => {
      let message = err as string;
      if (typeof err !== 'string' && err.text) {
        message = await err.text();
      }

      if (opts.dispatch) {
        return opts.dispatch(opts.failure({ message: err, status }));
      }

      loglevel.error(message);
      return message;
    });
};
