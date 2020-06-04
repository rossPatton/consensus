import { tActions } from './_types';
import { GET_FAILURE, GET_INIT, GET_SUCCESS } from './get/_types';
import { PATCH_FAILURE, PATCH_INIT, PATCH_SUCCESS } from './patch/_types';
import { POST_FAILURE, POST_INIT, POST_SUCCESS } from './post/_types';

export const initialState: ts.thunk<ts.group> = {
  error: null,
  fetched: false,
  isLoading: true,
  data: {} as ts.group,
};

export const groupReducer = (state = initialState, action: tActions) => {
  const failureReturn = {
    ...state,
    error: action.payload,
    isLoading: false,
  };

  const initReturn = {
    ...state,
    isLoading: true,
  };

  const successReturn = {
    ...state,
    fetched: true,
    data: action.payload,
    isLoading: false,
  };

  switch (action.type) {
  case GET_INIT:
    return initReturn;
  case PATCH_INIT:
    return initReturn;
  case POST_INIT:
    return initReturn;

  case GET_FAILURE:
    return failureReturn;
  case PATCH_FAILURE:
    return failureReturn;
  case POST_FAILURE:
    return failureReturn;

  case GET_SUCCESS:
    return successReturn;
  case PATCH_SUCCESS:
    return successReturn;
  case POST_SUCCESS:
    return successReturn;

  default:
    return state;
  }
};
