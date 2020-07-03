import {tActions} from './_types';
import {GET_FAILURE, GET_INIT, GET_SUCCESS} from './get/_types';

export const initialState: ts.thunk<ts.user[]> = {
  error: null,
  fetched: false,
  isLoading: false,
  data: [],
};

export const usersReducer = (state = initialState, action: tActions) => {
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

  const initReturn = {
    ...state,
    isLoading: true,
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
