import { tActionUnion } from './_types';
import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
} from './actions';

const initialState: tThunk<tUser | null> = {
  error: null,
  isLoading: false,
  data: null,
};

export const registerUserReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case REGISTER_USER_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case REGISTER_USER_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case REGISTER_USER_FAILURE:
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
