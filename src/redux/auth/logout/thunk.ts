import { logoutPath } from '../_constants';
import { api } from '../../../utils';
import { logoutFailure, logoutSuccess } from './actions';

export const logout = () => {
  return async function (dispatch: Function) {
    return api({
      credentials: true,
      dispatch,
      failure: logoutFailure,
      path: logoutPath,
      success: logoutSuccess,
    });
  };
};
