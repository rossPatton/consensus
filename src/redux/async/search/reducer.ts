import {
  GET_ORGS_BY_SEARCH_BEGIN,
  GET_ORGS_BY_SEARCH_FAILURE,
  GET_ORGS_BY_SEARCH_SUCCESS,
  tActionUnion,
} from './_types';

const initialState: tThunk<tOrg[]> = {
  error: null,
  isLoading: false,
  data: [],
};

export const searchReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_ORGS_BY_SEARCH_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_ORGS_BY_SEARCH_SUCCESS: {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };
  }

  case GET_ORGS_BY_SEARCH_FAILURE:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
