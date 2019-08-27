import { tActionUnion } from './_types';
import {
  GET_USERS_BEGIN,
  GET_USERS_FAILURE,
  GET_USERS_SUCCESS,
} from './actions';

const initialState: tThunk<tUser[]> = {
  error: null,
  isLoading: false,
  data: [],
};

export const getUsersReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_USERS_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_USERS_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case GET_USERS_FAILURE:
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
