import { api } from '@app/utils';

import { path } from '../_constants';
import { failure, success } from './actions';

export const postRsvps = (query: tRSVPQuery) => {
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
