import { path } from '../_constants';
import { api } from '../../../utils';
import { failure, success } from './actions';

export const patchAccount = (query: tOrgQuery) => {
  return async function (dispatch: Function) {
    return api({
      credentials: true,
      dispatch,
      failure,
      method: 'PATCH',
      query,
      path,
      success,
    });
  };
};
