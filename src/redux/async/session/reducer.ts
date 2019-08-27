import {
  AUTHENTICATE_BEGIN,
  AUTHENTICATE_FAILURE,
  AUTHENTICATE_SUCCESS,
  LOG_OUT_BEGIN,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS,
  tSessionUnion,
} from './_types';

const initialState: tThunk<tAuth> = {
  error: null,
  isLoading: false,
  data: {
    isAuthenticated: false,
  },
};

export const authenticateSessionReducer = (state = initialState, action: tSessionUnion) => {
  switch (action.type) {
  case AUTHENTICATE_BEGIN:
    return {
      ...state,
      error: null,
      isLoading: true,
    };

  case AUTHENTICATE_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case AUTHENTICATE_FAILURE:
    return {
      data: { isAuthenticated: false },
      error: action.payload,
      isLoading: false,
    };

  case LOG_OUT_BEGIN:
    return {
      ...state,
      error: null,
      isLoading: true,
    };

  case LOG_OUT_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case LOG_OUT_FAILURE:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
