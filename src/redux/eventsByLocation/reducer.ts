import { tActionUnion } from './_types';
import { GET_FAILURE, GET_SUCCESS } from './get/_types';

const initialState: tThunk<tEvent[]> = {
  error: null,
  isLoading: true,
  data: [] as tEvent[],
};

export const eventsByLocationReducer = (state = initialState, action: tActionUnion) => {
  const failureReturn = {
    ...state,
    error: action.payload,
    isLoading: false,
  };

  const successReturn = {
    ...state,
    data: action.payload,
    isLoading: false,
  };

  switch (action.type) {

  case GET_FAILURE:
    return failureReturn;

  case GET_SUCCESS:
    return successReturn;

  default:
    return state;
  }
};
