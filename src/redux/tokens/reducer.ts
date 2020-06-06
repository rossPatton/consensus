import { tActions } from './_types';
import { SEND_FAILURE, SEND_INIT, SEND_SUCCESS } from './send/_types';
import { VALIDATE_FAILURE, VALIDATE_INIT, VALIDATE_SUCCESS } from './validate/_types';

export const initialState: ts.thunk<any> = {
  error: null,
  isLoading: false,
  data: {},
};

export const tokenReducer = (state = initialState, action: tActions) => {
  const failureReturn = {
    ...state,
    error: action.payload,
  };

  const successReturn = {
    ...state,
    data: action.payload,
    isLoading: false,
  };

  const initReturn = {
    ...state,
    isLoading: true,
  };

  switch (action.type) {
  case SEND_INIT:
    return initReturn;
  case SEND_FAILURE:
    return failureReturn;
  case SEND_SUCCESS:
    return successReturn;

  case VALIDATE_INIT:
    return initReturn;
  case VALIDATE_FAILURE:
    return failureReturn;
  case VALIDATE_SUCCESS:
    return successReturn;

  default:
    return state;
  }
};
