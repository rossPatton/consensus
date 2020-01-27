import { path } from '../_constants';
import { api } from '../../../utils';
import { failure, success } from './actions';

export const deleteUser = (query: tDirectoryParams) => {
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
