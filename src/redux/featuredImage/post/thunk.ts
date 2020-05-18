import { api } from '~app/utils';

import { path } from '../_constants';
import { failure, init, success } from './actions';

export const postFeaturedImage = (body: ts.spacesQuery) => {
  return async function (dispatch: Function) {
    return api({
      body,
      dispatch,
      failure,
      init,
      method: 'POST',
      path,
      success,
    });
  };
};
