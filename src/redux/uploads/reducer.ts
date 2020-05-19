import { tActions } from './_types';
import { POST_FAILURE, POST_INIT, POST_SUCCESS } from './post/_types';

export const initialState: ts.thunk<ts.upload> = {
  error: null,
  isLoading: false,
  data: {},
};

export const uploadsReducer = (state = initialState, action: tActions) => {
  const initReturn = {
    ...state,
    isLoading: true,
  };

  const failureReturn = {
    ...state,
    error: action.payload,
    isLoading: false,
  };

  switch (action.type) {
  case POST_INIT:
    return initReturn;

  case POST_FAILURE:
    return failureReturn;

  case POST_SUCCESS: {
    return {
      ...state,
      isLoading: false,
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
