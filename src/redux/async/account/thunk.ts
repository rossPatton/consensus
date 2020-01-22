

import {api} from '../../../utils';
import {
  patchAccountBegin,
  patchAccountFailure,
  patchAccountSuccess,
} from './actions';

const endpoint = '/api/v1/account';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const patchAccount = (query: tAccount) => {
  return async function (dispatch: Function) {
    dispatch(patchAccountBegin());

    try {
      const result = await api({
        // we need credentials here so that the session cookie gets set properly
        credentials: __DEV__ ? 'include' : 'same-origin',
        method: 'PATCH',
        query,
        path,
      });

      return dispatch(patchAccountSuccess(result));
    } catch (err) {
      return dispatch(patchAccountFailure(err));
    }
  };
};
