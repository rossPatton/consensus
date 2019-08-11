import { SET_ACTIVE_SESSION, tSessionAction } from './_types';

const initialState: tSession = {
  isAuthenticated: false,
};

// TODO: need separate
export const sessionReducer = (state = initialState, action: tSessionAction) => {
  switch (action.type) {
  case SET_ACTIVE_SESSION:
    return {
      ...state,
      session: action.payload,
    };
  default:
    return state;
  }
};
