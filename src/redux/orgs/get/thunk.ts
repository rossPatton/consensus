import { path } from '../_constants';
import { api } from '../../../utils';
import { failure, success } from './actions';

export const getGroups = (query: tGetGroupQuery) => {
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
