import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, init, success } from './actions';

export const patchEvent = (query: ts.upsertMeetingQuery) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      init,
      method: 'PATCH',
      query,
      path,
      success,
    });
  };
};
