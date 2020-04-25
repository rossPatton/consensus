import { tActions } from './_types';
import { GET_FAILURE, GET_INIT, GET_SUCCESS } from './get/_types';

export const initialState: tThunk<tMeeting[]> = {
  error: null,
  fetched: false,
  isLoading: false,
  data: [] as tMeeting[],
};

export const meetingsByUserIdReducer = (state = initialState, action: tActions) => {
  switch (action.type) {
  case GET_FAILURE:
    return {
      ...state,
      error: action.payload,
    };

  case GET_INIT:
    return {
      ...state,
      isLoading: true,
    };

  case GET_SUCCESS:
    return {
      ...state,
      fetched: true,
      data: action.payload,
    };

  default:
    return state;
  }
};
