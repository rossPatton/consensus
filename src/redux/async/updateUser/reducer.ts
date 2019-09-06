import {
  tActionUnion,
  UPDATE_USER_BEGIN,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
} from './_types';

const initialState: tThunk<tSession> = {
  error: null,
  isLoading: false,
  data: {},
};

export const updateUserReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case UPDATE_USER_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case UPDATE_USER_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case UPDATE_USER_FAILURE:
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
