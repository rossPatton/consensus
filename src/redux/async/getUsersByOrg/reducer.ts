import {
  GET_USERS_BY_ORG_BEGIN,
  GET_USERS_BY_ORG_FAILURE,
  GET_USERS_BY_ORG_SUCCESS,
  tActionUnion,
} from './_types';

const initialState: tThunk<tUsersByOrg> = {
  error: null,
  isLoading: false,
  data: {
    userTotal: 0,
    users: [],
  },
};

export const getUsersByOrgReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_USERS_BY_ORG_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_USERS_BY_ORG_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case GET_USERS_BY_ORG_FAILURE:
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
