import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, success } from './actions';

export const deleteOrgByUserId = (query: ts.deleteUserByGroupIdQuery) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      method: 'DELETE',
      query,
      path,
      success,
    });
  };
};