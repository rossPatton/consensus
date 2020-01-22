
import { api } from '../../../utils';
import {
  getDecisionBegin,
  getDecisionFailure,
  getDecisionSuccess,
  postDecisionBegin,
  postDecisionFailure,
  postDecisionSuccess,
} from './actions';

const endpoint = '/api/v1/decision';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getDecision = (query: tIdQueryC) => {
  return async function (dispatch: Function) {
    dispatch(getDecisionBegin());

    try {
      const result = await api({query, path});
      return dispatch(getDecisionSuccess(result));
    } catch (err) {
      return dispatch(getDecisionFailure(err));
    }
  };
};

export const postDecision = (query: tIdQueryC) => {
  return async function (dispatch: Function) {
    dispatch(postDecisionBegin());

    try {
      const result = await api({method: 'POST', query, path});
      return dispatch(postDecisionSuccess(result));
    } catch (err) {
      return dispatch(postDecisionFailure(err));
    }
  };
};
