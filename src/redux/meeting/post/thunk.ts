import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, init, success } from './actions';

export const postMeeting = (query: tUpsertMeetingQuery) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      init,
      method: 'POST',
      query,
      path,
      success,
    });
  };
};
