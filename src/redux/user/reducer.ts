import { tActions } from './_types';
import { DELETE_FAILURE, DELETE_INIT, DELETE_SUCCESS } from './delete/_types';
import { GET_FAILURE, GET_INIT, GET_SUCCESS } from './get/_types';
import { PATCH_FAILURE, PATCH_INIT, PATCH_SUCCESS } from './patch/_types';
import { POST_FAILURE, POST_INIT, POST_SUCCESS } from './post/_types';

export const initialState: ts.thunk<ts.user> = {
  error: null,
  fetched: false,
  isLoading: false,
  data: {} as ts.user,
};

export const userReducer = (state = initialState, action: tActions) => {
  const failureReturn = {
    ...state,
    error: action.payload,
  };

  const successReturn = {
    ...state,
    data: action.payload,
    fetched: true,
  };

  const initReturn = {
    ...state,
    isLoading: true,
  };

  switch (action.type) {
  case DELETE_INIT:
    return initReturn;
  case GET_INIT:
    return initReturn;
  case PATCH_INIT:
    return initReturn;
  case POST_INIT:
    return initReturn;

  case DELETE_FAILURE:
    return failureReturn;
  case GET_FAILURE:
    return failureReturn;
  case PATCH_FAILURE:
    return failureReturn;
  case POST_FAILURE:
    return failureReturn;

  case DELETE_SUCCESS:
    return successReturn;
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
