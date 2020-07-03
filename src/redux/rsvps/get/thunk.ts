import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, init, success } from './actions';

export const getRsvps = (query: any) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      init,
      path,
      query,
      success,
    });
  };
};
