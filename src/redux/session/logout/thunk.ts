import { api } from '~app/utils';

import { logoutPath } from '../_constants';
import { failure, init, success } from './actions';

export const logout = () => {
  return async function (dispatch: Function): Promise<ts.isAuthenticated> {
    return api({
      credentials: true,
      dispatch,
      failure,
      init,
      path: logoutPath,
      success,
    });
  };
};
