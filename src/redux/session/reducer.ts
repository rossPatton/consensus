import { tActions } from './_types';
import { LOGIN_FAILURE, LOGIN_INIT, LOGIN_SUCCESS } from './login/_types';
import { LOGOUT_FAILURE, LOGOUT_INIT, LOGOUT_SUCCESS } from './logout/_types';
import { PATCH_FAILURE, PATCH_SUCCESS } from './patch/_types';

export const initialState: ts.thunk<ts.session> = {
  error: null,
  isLoading: false,
  data: {
    isAuthenticated: false,
  } as ts.session,
};

export const sessionReducer = (state = initialState, action: tActions) => {
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

  const initReturn = {
    ...state,
    isLoading: true,
  };

  switch (action.type) {
  case LOGIN_INIT:
    return initReturn;
  case LOGOUT_INIT:
    return initReturn;

  case LOGIN_FAILURE:
    return failureReturn;
  case LOGOUT_FAILURE:
    return failureReturn;
  case PATCH_FAILURE:
    return failureReturn;

  case LOGIN_SUCCESS:
    return action.payload;
  case LOGOUT_SUCCESS:
    return {
      ...successReturn,
      fetched: false,
    };
  case PATCH_SUCCESS: {
    return {
      ...state,
      data: {
        ...state.data,
        ...action.payload,
      },
    };
  }

  default:
    return state;
  }
};
