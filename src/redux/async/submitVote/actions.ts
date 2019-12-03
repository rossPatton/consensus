import {
  SUBMIT_VOTE_BEGIN,
  SUBMIT_VOTE_FAILURE,
  SUBMIT_VOTE_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const submitVoteBegin = (): tBeginAction => ({
  type: SUBMIT_VOTE_BEGIN,
});

export const submitVoteSuccess = (payload: tThunk<tSession>): tSuccessAction => ({
  type: SUBMIT_VOTE_SUCCESS,
  payload,
});

export const submitVoteFailure = (payload: Error): tFailureAction => ({
  type: SUBMIT_VOTE_FAILURE,
  payload,
});
