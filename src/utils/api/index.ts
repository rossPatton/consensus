import loglevel from 'loglevel';

import {agent, objToQueryString} from '..';
import {tApiOpts} from './_types';

export const api = async (opts: tApiOpts) => {
  const {body, method = 'GET', path, query} = opts;

  const fetchOpts = {agent, method} as {[key: string]: any};
  if (opts.credentials) {
    fetchOpts.credentials = 'same-origin';
  }
  if (body) {
    fetchOpts.body = body;
  }

  // not all api endpoints require query params
  let endpoint = path;
  if (query) {
    const qs = objToQueryString(query);
    endpoint = `${path}?${qs}`;
  }

  if (opts.init) opts.dispatch(opts.init());

  let status: ts.statusUnion;
  return fetch(endpoint, fetchOpts)
    .then((resp: ts.fetchResponse) => {
      status = resp.status as ts.statusUnion;
      if (!resp.ok) throw resp;
      if (status === 204) {
        throw Error('204: Nothing found');
      }

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
        opts.dispatch(opts.failure({message: err, status}));
      }

      loglevel.error({message: err, status});
      throw Error(message);
    });
};
