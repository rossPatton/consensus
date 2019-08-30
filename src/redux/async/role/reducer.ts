import {
  GET_ROLE_BEGIN,
  GET_ROLE_FAILURE,
  GET_ROLE_SUCCESS,
  tActionUnion,
} from './_types';

const initialState: tThunk<any> = {
  error: null,
  isLoading: false,
  data: null,
};

export const roleReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_ROLE_BEGIN:
    return {
      ...state,
      error: null,
      isLoading: true,
    };

  case GET_ROLE_SUCCESS:
    return {
      ...state,
      data: action.payload.role,
      isLoading: false,
    };

  case GET_ROLE_FAILURE:
    return {
      data: null,
      error: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
