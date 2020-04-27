import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, init, success } from './actions';

export const deleteUserByGroupId = (query: tDeleteUserByGroupIdQuery) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      init,
      method: 'DELETE',
      query,
      path,
      success,
    });
  };
};
