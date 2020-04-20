import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, success } from './actions';

export const patchUser = (query: Partial<tUser>) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      method: 'PATCH',
      query,
      path,
      success,
    });
  };
};
