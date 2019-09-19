import {
  GET_ROLES_BEGIN,
  GET_ROLES_FAILURE,
  GET_ROLES_SUCCESS,
  SET_ROLE,
  tActionUnion,
} from './_types';

const initialState: tThunk<any> = {
  error: null,
  isLoading: false,
  data: [],
};

export const roleReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_ROLES_BEGIN:
    return {
      ...state,
      error: null,
      isLoading: true,
    };

  case GET_ROLES_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case GET_ROLES_FAILURE:
    return {
      data: null,
      error: action.payload,
      isLoading: false,
    };

  // eslint-disable-next-line
  case SET_ROLE:
    return {
      ...state,
      data: action.payload.role,
      isLoading: false,
    };

  default:
    return state;
  }
};
