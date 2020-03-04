import { path } from '../_constants';
import { api } from '../../../utils';
import { failure, success } from './actions';

export const deleteAccount = (query: tAccountQuery) => {
  return async function (dispatch: Function) {
    return api({
      credentials: true,
      dispatch,
      failure,
      method: 'DELETE',
      path,
      query,
      success,
    });
  };
};
