import { tActions } from './_types';
import { POST_FAILURE, POST_INIT, POST_SUCCESS } from './post/_types';

export const initialState: ts.thunk<ts.upload> = {
  error: null,
  isLoading: false,
  data: {},
};

export const emailsReducer = (state = initialState, action: tActions) => {
  switch (action.type) {
  case POST_INIT:
    return {
      ...state,
      isLoading: true,
    };

  case POST_FAILURE:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  case POST_SUCCESS: {
    return {
      ...state,
      isLoading: false,
      data: action.payload,
    };
  }

  default:
    return state;
  }
};
