import {
  GET_DECISION_BEGIN,
  GET_DECISION_FAILURE,
  GET_DECISION_SUCCESS,
  tActionUnion,
} from './_types';

const initialState: tThunk<tDecision> = {
  error: null,
  isLoading: false,
  data: {} as tDecision,
};

export const getDecisionReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_DECISION_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_DECISION_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case GET_DECISION_FAILURE:
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
