import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, init, success } from './actions';

export const postAccount = (query: ts.accountQuery) => {
  return async function (dispatch: Function) {
    return api({
      credentials: true,
      dispatch,
      failure,
      init,
      method: 'POST',
      query,
      path,
      success,
    });
  };
};
