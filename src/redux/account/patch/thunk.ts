import { api } from '@app/utils';

import { path } from '../_constants';
import { failure, success } from './actions';

export const patchAccount = (query: tAccountQuery) => {
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
