import { path } from '../_constants';
import { api } from '../../../utils';
import { failure, success } from './actions';

export const patchRsvp = (query: tRSVPQuery) => {
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
