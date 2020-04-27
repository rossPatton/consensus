import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, init, success } from './actions';

export const patchUser = (query: Partial<ts.user>) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      init,
      method: 'PATCH',
      query,
      path,
      success,
    });
  };
};
