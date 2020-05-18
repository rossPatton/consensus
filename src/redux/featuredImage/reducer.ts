import { tActions } from './_types';
import { POST_FAILURE, POST_INIT, POST_SUCCESS } from './post/_types';

export const initialState: ts.thunk<{img: string}> = {
  error: null,
  fetched: false,
  isLoading: false,
  data: {img: ''},
};

export const featuredImageReducer = (state = initialState, action: tActions) => {
  const initReturn = {
    ...state,
    isLoading: true,
  };

  const failureReturn = {
    ...state,
    error: action.payload,
    isLoading: false,
  };

  const successReturn = {
    ...state,
    data: action.payload,
    fetched: true,
    isLoading: false,
  };

  switch (action.type) {
  case POST_INIT:
    return initReturn;

  case POST_FAILURE:
    return failureReturn;

  case POST_SUCCESS:
    return successReturn;

  default:
    return state;
  }
};
