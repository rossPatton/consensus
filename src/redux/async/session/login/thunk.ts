

import { api } from '../../../../utils';
import { loginBegin, loginFailure, loginSuccess } from './actions';

const endpoint = '/auth/login';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const login = (query: tLogin) => {
  return async function (dispatch: Function) {
    dispatch(loginBegin());

    try {
      const result = await api({
        credentials: __DEV__ ? 'include' : 'same-origin',
        method: 'POST',
        query,
        path,
      });

      return dispatch(loginSuccess(result));
    } catch (err) {
      return dispatch(loginFailure(err));
    }
  };
};
