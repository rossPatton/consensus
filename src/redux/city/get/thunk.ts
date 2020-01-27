import { path } from '../_constants';
import { api } from '../../../utils';
import { getCityFailure, getCitySuccess } from './actions';

export const getCity = (query: tDirectoryParams) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure: getCityFailure,
      query,
      path,
      success: getCitySuccess,
    });
  };
};
