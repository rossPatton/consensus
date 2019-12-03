import {
  SUBMIT_VOTE_BEGIN,
  SUBMIT_VOTE_FAILURE,
  SUBMIT_VOTE_SUCCESS,
  tActionUnion,
} from './_types';

const initialState: tThunk<tUser> = {
  error: null,
  isLoading: false,
  data: {} as tUser,
};

export const submitVoteReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case SUBMIT_VOTE_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case SUBMIT_VOTE_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case SUBMIT_VOTE_FAILURE:
    return {
      ...state,
      error: action.payload,
      data: initialState.data,
      isLoading: false,
    };

  default:
    return initialState;
  }
};
