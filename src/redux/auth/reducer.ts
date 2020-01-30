import { tAuthActionUnion } from './_types';
import { LOGIN_FAILURE, LOGIN_SUCCESS } from './login/_types';
import { LOGOUT_FAILURE, LOGOUT_SUCCESS } from './logout/_types';

const initialState: tThunk<tSession> = {
  error: null,
  isLoading: true,
  data: { isAuthenticated: false } as tSession,
};

export const authReducer = (state = initialState, action: tAuthActionUnion) => {
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
  case LOGIN_FAILURE:
    return failureReturn;

  case LOGIN_SUCCESS:
    return successReturn;

  case LOGOUT_FAILURE:
    return failureReturn;

  case LOGOUT_SUCCESS:
    return successReturn;

  default:
    return state;
  }
};
