import { tActions } from './_types';
import { DELETE_FAILURE, DELETE_INIT, DELETE_SUCCESS } from './delete/_types';
import { GET_FAILURE, GET_INIT, GET_SUCCESS } from './get/_types';

export const initialState: ts.thunk<ts.meeting[]> = {
  error: null,
  fetched: false,
  isLoading: false,
  data: [] as ts.meeting[],
};

export const meetingsByGroupIdReducer = (state = initialState, action: tActions) => {
  const initReturn = {
    ...state,
    isLoading: true,
  };

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
  case DELETE_INIT:
    return initReturn;
  case GET_INIT:
    return initReturn;

  case DELETE_FAILURE:
    return failureReturn;
  case GET_FAILURE:
    return failureReturn;

  case DELETE_SUCCESS: {
    const {id} = action.payload;
    return {
      ...state,
      data: [...state.data].filter(ev => ev.id !== id),
    };
  }

  case GET_SUCCESS:
    return successReturn;

  default:
    return state;
  }
};
