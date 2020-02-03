import { path } from '../_constants';
import { api } from '../../../utils';
import { failure, init, success } from './actions';

export const getRsvps = () => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      init,
      path,
      success,
    });
  };
};
