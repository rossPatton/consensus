import {
  GET_DECISION_BEGIN,
  GET_DECISION_FAILURE,
  GET_DECISION_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const getDecisionsByOrgBegin = (): tBeginAction => ({
  type: GET_DECISION_BEGIN,
});

export const getDecisionsByOrgSuccess = (payload: tThunk<tDecision>): tSuccessAction => ({
  type: GET_DECISION_SUCCESS,
  payload,
});

export const getDecisionsByOrgFailure = (payload: Error): tFailureAction => ({
  type: GET_DECISION_FAILURE,
  payload,
});
