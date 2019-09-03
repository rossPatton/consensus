import {
  GET_USERS_BY_ORG_BEGIN,
  GET_USERS_BY_ORG_FAILURE,
  GET_USERS_BY_ORG_SUCCESS,
  POST_USER_BY_ORG_BEGIN,
  POST_USER_BY_ORG_FAILURE,
  POST_USER_BY_ORG_SUCCESS,
  SET_USER_BY_ORG,
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

export const usersByOrgReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_USERS_BY_ORG_BEGIN || POST_USER_BY_ORG_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_USERS_BY_ORG_SUCCESS || POST_USER_BY_ORG_SUCCESS || SET_USER_BY_ORG:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case GET_USERS_BY_ORG_FAILURE || POST_USER_BY_ORG_FAILURE:
    return {
      ...state,
      data: initialState.data,
      error: action.payload,
      isLoading: false,
    };

  case SET_USER_BY_ORG:
    return {
      ...state,
      data: {
        users: [action.payload, ...state.data.users],
        userTotal: state.data.userTotal + 1,
      },
      isLoading: false,
    };

  default:
    return state;
  }
};
