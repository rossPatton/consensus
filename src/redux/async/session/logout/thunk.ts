import { api } from '../../../../utils';
import { logOutBegin, logOutFailure, logOutSuccess } from './actions';

const endpoint = '/auth/logout';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const logout = () => {
  return async function (dispatch: Function) {
    dispatch(logOutBegin());

    try {
      const result = await api({
        credentials: __DEV__ ? 'include' : 'same-origin',
        path,
      });
      return dispatch(logOutSuccess(result));
    } catch (err) {
      return dispatch(logOutFailure(err));
    }
  };
};
