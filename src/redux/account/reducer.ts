import { tAccountActionUnion } from './_types';
import { DELETE_FAILURE, DELETE_SUCCESS } from './delete/_types';
import { PATCH_FAILURE, PATCH_SUCCESS } from './patch/_types';

export const initialState: tThunk<tSession> = {
  error: null,
  fetched: false,
  isLoading: true,
  data: {} as tSession,
};

export const accountReducer = (state = initialState, action: tAccountActionUnion) => {
  const failureReturn = {
    ...state,
    error: action.payload,
    isLoading: false,
  };

  const successReturn = {
    ...state,
    fetched: true,
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
