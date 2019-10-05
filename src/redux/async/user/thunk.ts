import {Dispatch} from 'redux';
import {memoize} from 'redux-memoize';

import {agent, objToQueryString} from '../../../utils';
import {
  getUserBegin,
  getUserFailure,
  getUserSuccess,
} from './actions';

const prefix = `${__URL__}/api/v1/user`;

// TODO this is really just getting the current session - and why even have limit etc here
export const getUser = memoize({ttl: 300},
  (limit: number = 100, offset: number = 0) => {
    return async function <S>(dispatch: Dispatch<S>) {
      dispatch(getUserBegin());

      try {
        const qs = objToQueryString({limit, offset});

        // @ts-ignore
        const result = await fetch(`${prefix}?${qs}`, {agent})
          .then((response: tFetchResponse) => {
            if (!response.ok) throw response;
            return response.json();
          });

        return dispatch(getUserSuccess(result));
      } catch (err) {
        return dispatch(getUserFailure(err));
      }
    };
  });

export const getUserById = memoize({ttl: 300}, (query: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getUserBegin());

    try {
      const qs = objToQueryString(query);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getUserSuccess(result));
    } catch (err) {
      return dispatch(getUserFailure(err));
    }
  };
});
