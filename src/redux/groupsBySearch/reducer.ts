import { tActionUnion } from './_types';
import { GET_FAILURE, GET_INIT, GET_SUCCESS } from './get/_types';

export const initialState: tThunk<tGroup[]> = {
  error: null,
  fetched: false,
  isLoading: false,
  data: [],
};

export const groupsBySearchReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_INIT: {
    return {
      ...state,
      isLoading: true,
    };
  }

  case GET_SUCCESS: {
    return {
      ...state,
      fetched: true,
      data: action.payload,
      isLoading: false,
    };
  }

  case GET_FAILURE:
    return {
      ...state,
      error: action.payload,
    };

  default:
    return state;
  }
};
