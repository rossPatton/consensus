import {
  GET_DECISIONS_BY_ORG_BEGIN,
  GET_DECISIONS_BY_ORG_FAILURE,
  GET_DECISIONS_BY_ORG_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const getDecisionsByOrgBegin = (): tBeginAction => ({
  type: GET_DECISIONS_BY_ORG_BEGIN,
});

export const getDecisionsByOrgSuccess = (payload: tThunk<tDecision[]>): tSuccessAction => ({
  type: GET_DECISIONS_BY_ORG_SUCCESS,
  payload,
});

export const getDecisionsByOrgFailure = (payload: Error): tFailureAction => ({
  type: GET_DECISIONS_BY_ORG_FAILURE,
  payload,
});
