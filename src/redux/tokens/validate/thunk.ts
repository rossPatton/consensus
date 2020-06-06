import { api } from '~app/utils';

import { validatePath } from '../_constants';
import { failure, init, success } from './actions';

export const validateToken = (query: any) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      init,
      path: validatePath,
      query,
      success,
    });
  };
};
