import {
  GET_ROLES_BEGIN,
  GET_ROLES_FAILURE,
  GET_ROLES_SUCCESS,
  tActionUnion,
} from './_types';

const initialState: tThunk<tRoleMap[]> = {
  error: null,
  isLoading: false,
  data: [],
};

export const rolesReducer = (state = initialState, action: tActionUnion) => {
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
      ...state,
      error: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
