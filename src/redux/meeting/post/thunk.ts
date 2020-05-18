import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, init, success } from './actions';

export const postMeeting = (query: ts.upsertMeetingQuery) => {
  return async function (dispatch: Function) {
    return api({
      body: query,
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
