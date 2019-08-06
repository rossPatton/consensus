import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent } from '../../../utils';

import {
  getUsersBegin,
  getUsersSuccess,
  getUsersFailure,
} from './actions';

export const getUsers = memoize({ ttl: 300 },
  (limit: number = 100, offset: number = 0) => {
    return async function <S>(dispatch: Dispatch<S>) {
      dispatch(getUsersBegin());

      try {
        const prefix = __DEV__ ?
          'https://127.0.0.1:3001/api/v1/users' :
          '/api/v1/users';

        // @ts-ignore
        const result = await fetch(`${prefix}?limit=${limit}&offset=${offset}`, { agent });
        const json = await result.json();
        return dispatch(getUsersSuccess(json));
      } catch (err) {
        return dispatch(getUsersFailure(err));
      }
    };
  });
