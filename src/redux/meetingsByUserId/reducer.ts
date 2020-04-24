import { tActionUnion } from './_types';
import { GET_FAILURE, GET_SUCCESS } from './get/_types';

const initialState: tThunk<tMeeting[]> = {
  error: null,
  fetched: false,
  isLoading: true,
  data: [] as tMeeting[],
};

export const meetingsByUserIdReducer = (state = initialState, action: tActionUnion) => {
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
      fetched: true,
      data: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
