import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, success } from './actions';

export const postRole = () => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      method: 'POST',
      path,
      success,
    });
  };
};
