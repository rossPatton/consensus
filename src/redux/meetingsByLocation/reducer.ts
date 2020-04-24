import { tActionUnion } from './_types';
import { GET_FAILURE, GET_SUCCESS } from './get/_types';

const initialState: tThunk<tMeeting[]> = {
  error: null,
  fetched: false,
  isLoading: true,
  data: [] as tMeeting[],
};

export const meetingsByLocationReducer = (state = initialState, action: tActionUnion) => {
  const failureReturn = {
    ...state,
    error: action.payload,
    isLoading: false,
  };

  const successReturn = {
    ...state,
    data: action.payload,
    fetched: true,
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
