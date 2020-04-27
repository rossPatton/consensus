import { tActions } from './_types';
import { DELETE_FAILURE, DELETE_SUCCESS } from './delete/_types';
import { PATCH_FAILURE, PATCH_SUCCESS } from './patch/_types';

export const initialState: ts.thunk<ts.session> = {
  error: null,
  isLoading: true,
  data: {} as ts.session,
};

export const accountReducer = (state = initialState, action: tActions) => {
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
  case DELETE_FAILURE:
    return failureReturn;
  case PATCH_FAILURE:
    return failureReturn;

  case DELETE_SUCCESS:
    return successReturn;
  case PATCH_SUCCESS:
    return successReturn;

  default:
    return state;
  }
};
