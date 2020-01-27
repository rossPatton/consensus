import { path } from '../_constants';
import { api } from '../../../utils';
import { failure, success } from './actions';

export const getRoles = () => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure,
      path,
      success,
    });
  };
};
