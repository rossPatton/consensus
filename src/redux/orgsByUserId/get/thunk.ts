import { api } from '@app/utils';

import { path } from '../_constants';
import { failure, success } from './actions';

export const getGroupsByUserId = (query: tGroupsByUserIdQuery) => {
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
