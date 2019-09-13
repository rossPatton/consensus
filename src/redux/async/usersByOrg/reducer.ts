import {
  DELETE_USER_BY_ORG_BEGIN,
  DELETE_USER_BY_ORG_FAILURE,
  DELETE_USER_BY_ORG_SUCCESS,
  GET_USERS_BY_ORG_BEGIN,
  GET_USERS_BY_ORG_FAILURE,
  GET_USERS_BY_ORG_SUCCESS,
  PATCH_USER_BY_ORG_BEGIN,
  PATCH_USER_BY_ORG_FAILURE,
  PATCH_USER_BY_ORG_SUCCESS,
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
  case DELETE_USER_BY_ORG_BEGIN ||
    GET_USERS_BY_ORG_BEGIN ||
    PATCH_USER_BY_ORG_BEGIN ||
    POST_USER_BY_ORG_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_USERS_BY_ORG_SUCCESS ||
    POST_USER_BY_ORG_SUCCESS ||
    SET_USER_BY_ORG:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case DELETE_USER_BY_ORG_FAILURE ||
    GET_USERS_BY_ORG_FAILURE ||
    PATCH_USER_BY_ORG_FAILURE ||
    POST_USER_BY_ORG_FAILURE:
    return {
      ...state,
      data: initialState.data,
      error: action.payload,
      isLoading: false,
    };

  case PATCH_USER_BY_ORG_SUCCESS: {
    const patchedUser = action.payload as any;
    const userId = parseInt(patchedUser.userId, 10);
    const copy = [...state.data.users];
    const indexOfPatchedUser = copy.findIndex(user => userId === user.id);
    const userWithNewRole = {
      ...copy[indexOfPatchedUser],
      role: patchedUser.role,
    };

    // replace user in-place with updated relation
    copy.splice(indexOfPatchedUser, 1, userWithNewRole);

    return {
      ...state,
      data: {
        users: copy,
        userTotal: state.data.userTotal,
      },
      isLoading: false,
    };
  }

  case DELETE_USER_BY_ORG_SUCCESS: {
    const removedUser = action.payload as any;
    const userId = parseInt(removedUser.userId, 10);
    const copy = [...state.data.users];
    const indexOfRemovedUser = copy.findIndex(user => userId === user.id);
    copy.splice(indexOfRemovedUser, 1);

    return {
      ...state,
      data: {
        users: copy,
        userTotal: state.data.userTotal - 1,
      },
      isLoading: false,
    };
  }

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
