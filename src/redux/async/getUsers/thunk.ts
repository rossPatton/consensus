import {memoize} from 'redux-memoize';
import {Dispatch} from 'redux';
import {agent, objToQueryString} from '../../../utils';

import {
  getUsersBegin,
  getUsersSuccess,
  getUsersFailure,
} from './actions';

export const getUsers = memoize({ttl: 300},
  (limit: number = 100, offset: number = 0) => {
    return async function <S>(dispatch: Dispatch<S>) {
      dispatch(getUsersBegin());

      try {
        const prefix = `${__URL__}/api/v1/users`;
        const qs = objToQueryString({limit, offset});

        // @ts-ignore
        const result = await fetch(`${prefix}?${qs}`, {agent})
          .then((response: tFetchResponse) => {
            if (!response.ok) throw response;
            return response.json();
          });

        return dispatch(getUsersSuccess(result));
      } catch (err) {
        return dispatch(getUsersFailure(err));
      }
    };
  });
