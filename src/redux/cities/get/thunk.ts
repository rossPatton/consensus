import { path } from '../_constants';
import { api } from '../../../utils';
import { failure, success } from './actions';

export const getCities = (query: any) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      path,
      query,
      success,
    });
  };
};
