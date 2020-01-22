

import {api} from '../../../../utils';
import {
  getUsersByOrgBegin,
  getUsersByOrgFailure,
  getUsersByOrgSuccess,
} from './actions';

const endpoint = '/api/v1/usersByOrg';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getUsersByOrg = (query: tIdQueryC) => {
  return async function (dispatch: Function) {
    dispatch(getUsersByOrgBegin());

    try {
      const result = await api({query, path});
      return dispatch(getUsersByOrgSuccess(result));
    } catch (err) {
      return dispatch(getUsersByOrgFailure(err));
    }
  };
};
