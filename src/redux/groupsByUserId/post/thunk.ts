import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, init, success } from './actions';

export const postGroupByUserId = (query: ts.group) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      init,
      failure,
      query,
      path,
      success,
    });
  };
};
