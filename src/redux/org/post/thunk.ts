import { path } from '../_constants';
import { api } from '../../../utils';
import { failure, success } from './actions';

export const postOrg = (query: tOrgQuery) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      method: 'POST',
      query,
      path,
      success,
    });
  };
};
