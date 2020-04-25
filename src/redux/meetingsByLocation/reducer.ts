import { tActions } from './_types';
import { GET_FAILURE, GET_INIT, GET_SUCCESS } from './get/_types';

export const initialState: tThunk<tMeeting[]> = {
  error: null,
  fetched: false,
  isLoading: false,
  data: [] as tMeeting[],
};

export const meetingsByLocationReducer = (state = initialState, action: tActions) => {
  const failureReturn = {
    ...state,
    error: action.payload,
  };

  const successReturn = {
    ...state,
    data: action.payload,
    fetched: true,
  };

  switch (action.type) {
  case GET_INIT:
    return {
      ...state,
      isLoading: true,
    };

  case GET_FAILURE:
    return failureReturn;

  case GET_SUCCESS:
    return successReturn;

  default:
    return state;
  }
};
