import { tAccountActionUnion } from './_types';
import { PATCH_FAILURE, PATCH_SUCCESS } from './patch/_types';

const initialState: tThunk<tSession> = {
  error: null,
  isLoading: false,
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
    data: action.payload,
    isLoading: false,
  };

  switch (action.type) {
  case PATCH_FAILURE:
    return failureReturn;

  case PATCH_SUCCESS:
    return successReturn;

  default:
    return state;
  }
};
