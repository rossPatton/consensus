import { path } from '../_constants';
import { api } from '../../../utils';
import { failure, init, success } from './actions';

export const getRoles = () => {
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
