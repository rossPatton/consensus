import {api} from '~app/utils';

import {path} from '../_constants';
import {failure, init, success} from './actions';

export const getMeeting = (query: tGetMeetingQuery) => {
  return async function (dispatch: Function): Promise<tMeetingSingular> {
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
