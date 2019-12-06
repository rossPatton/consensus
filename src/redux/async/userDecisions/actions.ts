import {
  GET_VOTES_BEGIN,
  GET_VOTES_FAILURE,
  GET_VOTES_SUCCESS,
  SUBMIT_VOTE_BEGIN,
  SUBMIT_VOTE_FAILURE,
  SUBMIT_VOTE_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const getVotesBegin = (): tBeginAction => ({
  type: GET_VOTES_BEGIN,
});

export const getVotesSuccess = (payload: tThunk<any>): tSuccessAction => ({
  type: GET_VOTES_SUCCESS,
  payload,
});

export const getVotesFailure = (payload: Error): tFailureAction => ({
  type: GET_VOTES_FAILURE,
  payload,
});

export const submitVoteBegin = (): tBeginAction => ({
  type: SUBMIT_VOTE_BEGIN,
});

export const submitVoteSuccess = (payload: tThunk<any>): tSuccessAction => ({
  type: SUBMIT_VOTE_SUCCESS,
  payload,
});

export const submitVoteFailure = (payload: Error): tFailureAction => ({
  type: SUBMIT_VOTE_FAILURE,
  payload,
});
