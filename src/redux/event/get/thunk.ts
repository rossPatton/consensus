import {api} from '@app/utils';

import {path} from '../_constants';
import {failure, init, success} from './actions';

export const getEvent = (query: tGetEventQuery) => {
  return async function (dispatch: Function): Promise<tEvent> {
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
