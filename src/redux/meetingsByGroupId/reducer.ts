import { tActionUnion } from './_types';
import { DELETE_FAILURE, DELETE_SUCCESS } from './delete/_types';
import { GET_FAILURE, GET_SUCCESS } from './get/_types';

const initialState: tThunk<tMeeting[]> = {
  error: null,
  fetched: false,
  isLoading: true,
  data: [] as tMeeting[],
};

export const meetingsByGroupIdReducer = (state = initialState, action: tActionUnion) => {
  const failureReturn = {
    ...state,
    error: action.payload,
    isLoading: false,
  };

  const successReturn = {
    ...state,
    fetched: true,
    data: action.payload,
    isLoading: false,
  };

  switch (action.type) {
  case DELETE_FAILURE:
    return failureReturn;

  case GET_FAILURE:
    return failureReturn;

  case DELETE_SUCCESS: {
    const {id} = action.payload;
    return {
      error: null,
      data: [...state.data].filter(ev => ev.id !== id),
      isLoading: false,
    };
  }

  case GET_SUCCESS:
    return successReturn;

  default:
    return state;
  }
};
