import { api } from '~app/utils';

import { sendPath } from '../_constants';
import { failure, init, success } from './actions';

export const sendToken = (query: any) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      init,
      path: sendPath,
      query,
      success,
    });
  };
};
