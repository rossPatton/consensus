import { path } from '../_constants';
import { api } from '../../../utils';
import { failure, success } from './actions';

export const getUsersByOrgId = (query: tUsersByOrgIdQuery) => {
  console.log('getUsersByOrgId query => ', query);
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      query,
      path,
      success,
    });
  };
};
