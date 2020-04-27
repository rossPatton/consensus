import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, success } from './actions';

export const deleteUser = (query: ts.directoryParams) => {
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
