import { path } from '../_constants';
import { api } from '../../../utils';
import { failure, success } from './actions';

export const patchEvent = (query: tUpsertEventQuery) => {
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
