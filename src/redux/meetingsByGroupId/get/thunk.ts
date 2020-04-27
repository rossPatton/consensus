import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, init, success } from './actions';

export const getMeetingsByGroupId = (query: tGetMeetingQuery) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      init,
      query,
      path,
      success,
    });
  };
};
