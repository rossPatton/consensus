import {
  tActionUnion,
  AUTHENTICATE_BEGIN,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
} from './_types';

const initialState: tThunk<tAuth> = {
  error: null,
  isLoading: false,
  data: {
    isAuthenticated: false,
  },
};

export const authenticateSessionReducer = (state = initialState, action: tActionUnion) => {
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
      isLoading: false,
      // instead of storing the active session under auth, we use a sync action to
      // update the session redux state when a user logs in, logs out, updates, etc
      data: {
        // @ts-ignore
        isAuthenticated: action.payload.isAuthenticated,
      },
    };

  case AUTHENTICATE_FAILURE:
    return {
      data: { isAuthenticated: false },
      error: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
