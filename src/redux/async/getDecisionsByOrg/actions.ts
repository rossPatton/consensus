import {
  GET_DECISIONS_BEGIN,
  GET_DECISIONS_SUCCESS,
  GET_DECISIONS_FAILURE,
  tBeginAction,
  tSuccessAction,
  tFailureAction,
} from './_types';

export const getDecisionsBegin = (): tBeginAction => ({
  type: GET_DECISIONS_BEGIN,
});

export const getDecisionsSuccess = (payload: tThunk<tDecision[]>): tSuccessAction => ({
  type: GET_DECISIONS_SUCCESS,
  payload,
});

export const getDecisionsFailure = (payload: Error): tFailureAction => ({
  type: GET_DECISIONS_FAILURE,
  payload,
});
