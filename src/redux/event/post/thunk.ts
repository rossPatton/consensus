import { path } from '../_constants';
import { api } from '../../../utils';
import { failure, success } from './actions';

export const postEvent = (query: tPostEventQuery) => {
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
