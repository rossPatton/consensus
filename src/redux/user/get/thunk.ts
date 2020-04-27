import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, init, success } from './actions';

export const getUser = (query: ts.idQuery) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      init,
      query,
      path,
      success,
    });
  };
};
