import {
  tActionUnion,
  GET_DECISIONS_BY_ORG_BEGIN,
  GET_DECISIONS_BY_ORG_SUCCESS,
  GET_DECISIONS_BY_ORG_FAILURE,
} from './_types';

const initialState: tThunk<tDecision[]> = {
  error: null,
  isLoading: false,
  data: [],
};

export const getDecisionsByOrgReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_DECISIONS_BY_ORG_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_DECISIONS_BY_ORG_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case GET_DECISIONS_BY_ORG_FAILURE:
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
