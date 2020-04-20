import {api} from '~app/utils';

import {path} from '../_constants';
import {deleteEventFailure, deleteEventSuccess} from './actions';

export const deleteEvent = (query: tIdQuery) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure: deleteEventFailure,
      method: 'DELETE',
      query,
      path,
      success: deleteEventSuccess,
    });
  };
};
