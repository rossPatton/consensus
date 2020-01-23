import {agent, objToQueryString} from '.';

export const api = async (opts: tApiOpts) => {
  const {method = 'GET', path, query = {}} = opts;
  const qs = objToQueryString(query);

  const fetchOpts = {agent, method};
  if (opts.credentials) {
    (fetchOpts as any).credentials = opts.credentials;
  }

  // not all api endpoint require query params
  let endpoint = path;
  if (qs) {
    endpoint = `${path}?${qs}`;
  }

  return fetch(endpoint, fetchOpts)
    .then((response: tFetchResponse) => {
      console.log('response => ', response);
      if (!response.ok) throw response;
      return response.json();
    })
    .catch(console.error);
};
