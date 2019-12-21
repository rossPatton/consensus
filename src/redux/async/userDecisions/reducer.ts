import {
  GET_VOTES_BEGIN,
  GET_VOTES_FAILURE,
  GET_VOTES_SUCCESS,
  SUBMIT_VOTE_BEGIN,
  SUBMIT_VOTE_FAILURE,
  SUBMIT_VOTE_SUCCESS,
  tActionUnion,
} from './_types';

const initialState: tThunk<any> = {
  error: null,
  isLoading: true,
  data: [],
};

export const userDecisionsReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case SUBMIT_VOTE_BEGIN || GET_VOTES_BEGIN:
    return initialState;

  case SUBMIT_VOTE_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  /* eslint-disable */
  case GET_VOTES_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };
  /* eslint-enable */

  case SUBMIT_VOTE_FAILURE || GET_VOTES_FAILURE: {
    return {
      ...initialState,
      error: action.payload,
      isLoading: false,
    };
  }

  default:
    return initialState;
  }
};
