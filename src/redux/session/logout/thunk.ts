import { logoutPath } from '../_constants';
import { api } from '../../../utils';
import { failure, success } from './actions';

export const logout = () => {
  return async function (dispatch: Function) {
    return api({
      credentials: true,
      dispatch,
      failure,
      path: logoutPath,
      success,
    });
  };
};
