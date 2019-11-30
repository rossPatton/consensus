import {Dispatch} from 'redux';
import {memoize} from 'redux-memoize';

import {agent, objToQueryString} from '../../../utils';
import {
  getUserByIdBegin,
  getUserByIdFailure,
  getUserByIdSuccess,
} from './actions';

const endpoint = '/api/v1/user';
const prefix = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

// TODO this is really just getting the current session - and why even have limit etc here
export const getUserById = memoize({ttl: 300}, (query: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getUserByIdBegin());

    try {
      const qs = objToQueryString(query);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getUserByIdSuccess(result));
    } catch (err) {
      return dispatch(getUserByIdFailure(err));
    }
  };
});
