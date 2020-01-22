

import { api } from '../../../utils';
import {
  getDecisionsByOrgBegin,
  getDecisionsByOrgFailure,
  getDecisionsByOrgSuccess,
} from './actions';

const endpoint = '/api/v1/decisions';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getDecisionsByOrg = (query: tIdQueryC) => {
  return async function (dispatch: Function) {
    dispatch(getDecisionsByOrgBegin());

    try {
      const result = await api({query, path});
      return dispatch(getDecisionsByOrgSuccess(result));
    } catch (err) {
      return dispatch(getDecisionsByOrgFailure(err));
    }
  };
};
