import {api} from '../../../../utils';
import {postUserToOrgBegin, postUserToOrgFailure, postUserToOrgSuccess} from './actions';

const endpoint = '/api/v1/usersByOrg';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const postUserToOrg = (query: tIdQueryC) => {
  return async function (dispatch: Function) {
    dispatch(postUserToOrgBegin());

    try {
      const result = await api({method: 'POST', query, path});
      return dispatch(postUserToOrgSuccess(result));
    } catch (err) {
      return dispatch(postUserToOrgFailure(err));
    }
  };
};
