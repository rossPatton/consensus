import {
  GET_USER_BY_ID_BEGIN,
  GET_USER_BY_ID_FAILURE,
  GET_USER_BY_ID_SUCCESS,
  tActionUnion,
} from './_types';

const initialState: tThunk<tUser> = {
  error: null,
  isLoading: false,
  data: {} as tUser,
};

export const userReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_USER_BY_ID_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_USER_BY_ID_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case GET_USER_BY_ID_FAILURE:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
