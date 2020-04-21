import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, init, success } from './actions';

export const deleteAccount = (query: tAccountQuery) => {
  return async function (dispatch: Function) {
    return api({
      credentials: true,
      dispatch,
      failure,
      init,
      method: 'DELETE',
      path,
      query,
      success,
    });
  };
};
