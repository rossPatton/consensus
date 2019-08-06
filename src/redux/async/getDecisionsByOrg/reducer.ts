import {
  tActionUnion,
  GET_DECISIONS_BEGIN,
  GET_DECISIONS_SUCCESS,
  GET_DECISIONS_FAILURE,
} from './_types';

const initialState: tThunk<tDecision[]> = {
  error: null,
  isLoading: false,
  data: [],
};

export const getDecisionsByOrgReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_DECISIONS_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_DECISIONS_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case GET_DECISIONS_FAILURE:
    return {
      ...state,
      data: initialState.data,
      error: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
