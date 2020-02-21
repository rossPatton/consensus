import loglevel from 'loglevel';

import {agent, objToQueryString} from '.';

export const api = async (opts: tApiOpts) => {
  const {method = 'GET', path, query = {}} = opts;
  const qs = objToQueryString(query);

  const fetchOpts = {agent, method};
  if (opts.credentials) {
    (fetchOpts as any).credentials = __DEV__ ? 'include' : 'same-origin';
  }

  // not all api endpoints require query params
  let endpoint = path;
  if (qs) {
    endpoint = `${path}?${qs}`;
  }

  if (opts.init) opts.dispatch(opts.init());

  let status = 200;
  return fetch(endpoint, fetchOpts)
    .then((resp: tFetchResponse) => {
      status = resp.status;
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
    .catch(async (err: tFetchResponse<Error>) => {
      if (err.text) {
        const message = await err.text();
        if (opts.dispatch) {
          return opts.dispatch(opts.failure({message, status}));
        }

        return loglevel.error({message, status});
      }

      if (opts.dispatch) {
        return opts.dispatch(opts.failure({message: err, status}));
      }

      loglevel.error({message: err, status});
    });
};
