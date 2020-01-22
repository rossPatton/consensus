

import {api} from '../../../../utils';
import {
  patchUserByOrgBegin,
  patchUserByOrgFailure,
  patchUserByOrgSuccess,
} from './actions';

const endpoint = '/api/v1/usersByOrg';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const patchUserByOrg = (query: tPatchUserRoleQuery) => {
  return async function (dispatch: Function) {
    dispatch(patchUserByOrgBegin());

    try {
      const result = await api({method: 'PATCH', query, path});
      return dispatch(patchUserByOrgSuccess(result));
    } catch (err) {
      return dispatch(patchUserByOrgFailure(err));
    }
  };
};
