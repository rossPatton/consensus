import {agent, objToQueryString} from '.';

// TODO write a README for error handling and api calls
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

  let status = 200;
  return fetch(endpoint, fetchOpts)
    .then((resp: tFetchResponse) => {
      status = resp.status;
      if (!resp.ok) throw resp;
      return resp.json(); // we only get here if there is no error
    })
    .then(json => opts.dispatch(opts.success(json)))
    .catch(async (err: tFetchResponse<Error>) => {
      if (err.text) {
        const message = await err.text();
        return opts.dispatch(opts.failure({message, status}));
      }

      return opts.dispatch(opts.failure({message: err, status}));
    });
};
