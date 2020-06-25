import { tActions } from './_types';
import { GET_FAILURE, GET_INIT, GET_SUCCESS } from './get/_types';

export const initialState: ts.thunk<ts.meeting[]> = {
  error: null,
  isLoading: false,
  data: [] as ts.meeting[],
};

export const meetingsReducer = (state = initialState, action: tActions) => {
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
    data: action.payload,
    isLoading: false,
  };

  switch (action.type) {
  case GET_INIT:
    return initReturn;

  case GET_FAILURE:
    return failureReturn;

  case GET_SUCCESS:
    return successReturn;

  default:
    return state;
  }
};
