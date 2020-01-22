

import { api } from '../../../utils';
import {
  getVotesBegin,
  getVotesFailure,
  getVotesSuccess,
  submitVoteBegin,
  submitVoteFailure,
  submitVoteSuccess,
} from './actions';

const endpoint = '/api/v1/userDecisions';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getVotes = (query: tUser) => {
  return async function (dispatch: Function) {
    dispatch(getVotesBegin());

    try {
      const result = await api({path, query});
      return dispatch(getVotesSuccess(result));
    } catch (err) {
      return dispatch(getVotesFailure(err));
    }
  };
};

export const submitVote = (query: tVote) => {
  return async function (dispatch: Function) {
    dispatch(submitVoteBegin());

    try {
      const result = await api({
        credentials: __DEV__ ? 'include' : 'same-origin',
        method: 'POST',
        path,
        query,
      });

      return dispatch(submitVoteSuccess(result));
    } catch (err) {
      return dispatch(submitVoteFailure(err));
    }
  };
};
