import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, success } from './actions';

export const patchEvent = (query: tUpsertMeetingQuery) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      method: 'PATCH',
      query,
      path,
      success,
    });
  };
};
