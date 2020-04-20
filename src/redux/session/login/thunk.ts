import { api } from '~app/utils';

import { loginPath } from '../_constants';
import { failure, success } from './actions';

export const login = (query: tLoginQuery) => {
  return async function (dispatch: Function) {
    return api({
      credentials: true,
      dispatch,
      failure,
      method: 'POST',
      query,
      path: loginPath,
      success,
    });
  };
};
