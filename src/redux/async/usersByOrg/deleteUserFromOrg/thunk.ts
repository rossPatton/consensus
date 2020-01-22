

import {api} from '../../../../utils';
import {
  deleteUserFromOrgBegin,
  deleteUserFromOrgFailure,
  deleteUserFromOrgSuccess,
} from './actions';

const endpoint = '/api/v1/usersByOrg';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const deleteUserFromOrg = (query: tDeleteUserOrgQuery) => {
  return async function (dispatch: Function) {
    dispatch(deleteUserFromOrgBegin());

    try {
      const result = await api({method: 'DELETE', query, path});
      return dispatch(deleteUserFromOrgSuccess(result));
    } catch (err) {
      return dispatch(deleteUserFromOrgFailure(err));
    }
  };
};
