import { path } from '../_constants';
import { api } from '../../../utils';
import { failure, success} from './actions';

export const patchOrg = (query: tGroupQuery) => {
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
