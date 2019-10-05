import {
  PATCH_ACCOUNT_BEGIN,
  PATCH_ACCOUNT_FAILURE,
  PATCH_ACCOUNT_SUCCESS,
  tActionUnion,
} from './_types';

const initialState: tThunk<tUser> = {
  error: null,
  isLoading: false,
  data: {} as tUser,
};

export const patchAccountReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case PATCH_ACCOUNT_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case PATCH_ACCOUNT_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case PATCH_ACCOUNT_FAILURE:
    return {
      ...state,
      error: action.payload,
      data: initialState.data,
      isLoading: false,
    };

  default:
    return initialState;
  }
};
