import { tActionUnion } from './_types';
import {
  GET_USER_BEGIN,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
} from './_types';

const initialState: tThunk<tUser[]> = {
  error: null,
  isLoading: false,
  data: [],
};

export const userReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_USER_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_USER_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case GET_USER_FAILURE:
    return {
      ...state,
      data: initialState.data,
      error: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
