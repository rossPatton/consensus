import {tActionUnion} from './_types';
import {
  LOGIN_BEGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
} from './login/_types';
import {
  LOGOUT_BEGIN,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
} from './logout/_types';

const initialState: tThunk<tSession> = {
  error: null,
  isLoading: false,
  data: {} as tSession,
};

export const sessionReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case LOGIN_BEGIN:
    return {
      ...state,
      error: null,
      isLoading: true,
    };

  case LOGIN_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case LOGIN_FAILURE:
    return {
      data: { isAuthenticated: false },
      error: action.payload,
      isLoading: false,
    };

  /* eslint-disable */
  case LOGOUT_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case LOGOUT_SUCCESS:
    return {
      ...state,
      data: action.payload,
    };
  /* eslint-enable */

  case LOGOUT_FAILURE:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
