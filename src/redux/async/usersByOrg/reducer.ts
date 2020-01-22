// TODO actually please simplify somehow
import {tActionUnion} from './_types';
import {
  DELETE_USER_FROM_ORG_BEGIN,
  DELETE_USER_FROM_ORG_FAILURE,
  DELETE_USER_FROM_ORG_SUCCESS,
} from './deleteUserFromOrg/_types';
import {
  GET_USERS_BY_ORG_BEGIN,
  GET_USERS_BY_ORG_FAILURE,
  GET_USERS_BY_ORG_SUCCESS,
} from './getUsersByOrg/_types';
import {
  PATCH_USER_BY_ORG_BEGIN,
  PATCH_USER_BY_ORG_FAILURE,
  PATCH_USER_BY_ORG_SUCCESS,
} from './patchUserByOrg/_types';
import {
  POST_USER_TO_ORG_BEGIN,
  POST_USER_TO_ORG_FAILURE,
  POST_USER_TO_ORG_SUCCESS,
} from './postUserToOrg/_types';

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
  case DELETE_USER_FROM_ORG_BEGIN
    || GET_USERS_BY_ORG_BEGIN
    || PATCH_USER_BY_ORG_BEGIN
    || POST_USER_TO_ORG_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case DELETE_USER_FROM_ORG_FAILURE
    || GET_USERS_BY_ORG_FAILURE
    || PATCH_USER_BY_ORG_FAILURE
    || POST_USER_TO_ORG_FAILURE:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  case GET_USERS_BY_ORG_SUCCESS || POST_USER_TO_ORG_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case DELETE_USER_FROM_ORG_SUCCESS: {
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

  default:
    return state;
  }
};
