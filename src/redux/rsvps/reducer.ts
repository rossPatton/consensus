import { tRsvpsActionUnion } from './_types';
import { GET_FAILURE, GET_SUCCESS } from './get/_types';

const initialState: tThunk<tRSVP[]> = {
  error: null,
  isLoading: true,
  data: [],
};

export const rsvpsReducer = (state = initialState, action: tRsvpsActionUnion) => {
  switch (action.type) {
  case GET_FAILURE:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  case GET_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
