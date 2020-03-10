import { tActionUnion } from './_types';
import { LOGIN_FAILURE, LOGIN_SUCCESS } from './login/_types';
import { LOGOUT_FAILURE, LOGOUT_SUCCESS } from './logout/_types';
import { PATCH_FAILURE, PATCH_SUCCESS } from './patch/_types';

const initialState: tThunk<tSession> = {
  error: null,
  isLoading: true,
  data: { isAuthenticated: false } as tSession,
};

export const sessionReducer = (state = initialState, action: tActionUnion) => {
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
  case LOGOUT_FAILURE:
    return failureReturn;
  case PATCH_FAILURE:
    return failureReturn;

  case LOGIN_SUCCESS:
    return successReturn;
  case LOGOUT_SUCCESS:
    return successReturn;
  case PATCH_SUCCESS: {
    return {
      error: null as null,
      data: {
        ...state.data,
        ...action.payload,
      },
      isLoading: false,
    };
  }

  default:
    return state;
  }
};
