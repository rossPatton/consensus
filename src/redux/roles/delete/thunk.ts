import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, init, success } from './actions';

export const deleteRole = () => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      init,
      path,
      success,
    });
  };
};
