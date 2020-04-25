import { api } from '~app/utils';

import { loginPath } from '../_constants';
import { failure, init, success } from './actions';

export const login = (query: tLoginQuery) => {
  return async function (dispatch: Function) {
    return api({
      credentials: true,
      dispatch,
      failure,
      init,
      method: 'POST',
      query,
      path: loginPath,
      success,
    });
  };
};
