import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, init, success } from './actions';

export const patchAccount = (query: ts.accountQuery) => {
  return async function (dispatch: Function) {
    return api({
      credentials: true,
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
