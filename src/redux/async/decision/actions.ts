import {
  GET_DECISION_BEGIN,
  GET_DECISION_FAILURE,
  GET_DECISION_SUCCESS,
  POST_DECISION_BEGIN,
  POST_DECISION_FAILURE,
  POST_DECISION_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const getDecisionBegin = (): tBeginAction => ({
  type: GET_DECISION_BEGIN,
});

export const getDecisionSuccess = (payload: tThunk<tDecision>): tSuccessAction => ({
  type: GET_DECISION_SUCCESS,
  payload,
});

export const getDecisionFailure = (payload: Error): tFailureAction => ({
  type: GET_DECISION_FAILURE,
  payload,
});

export const postDecisionBegin = (): tBeginAction => ({
  type: POST_DECISION_BEGIN,
});

export const postDecisionSuccess = (payload: tThunk<tDecision>): tSuccessAction => ({
  type: POST_DECISION_SUCCESS,
  payload,
});

export const postDecisionFailure = (payload: Error): tFailureAction => ({
  type: POST_DECISION_FAILURE,
  payload,
});
