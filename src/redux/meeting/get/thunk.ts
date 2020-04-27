import {api} from '~app/utils';

import {path} from '../_constants';
import {failure, init, success} from './actions';

export const getMeeting = (query: ts.getMeetingQuery) => {
  return async function (dispatch: Function): Promise<ts.meetingSingular> {
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
