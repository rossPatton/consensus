// TODO actually please simplify somehow
import {tUsersByOrgActionUnion} from './_types';
import {DELETE_FAILURE, DELETE_SUCCESS} from './delete/_types';
import {GET_FAILURE, GET_SUCCESS} from './get/_types';
import {PATCH_FAILURE, PATCH_SUCCESS} from './patch/_types';
import {POST_FAILURE, POST_SUCCESS} from './post/_types';

const initialState: tThunk<tUser[]> = {
  error: null,
  isLoading: true,
  data: [],
};

export const usersByOrgReducer = (
  state = initialState,
  action: tUsersByOrgActionUnion,
) => {
  const failureReturn = {
    ...state,
    error: action.payload,
    isLoading: false,
  };

  const successReturn = {
    ...state,
    data: action.payload,
    isLoading: false,
  };

  switch (action.type) {
  case DELETE_FAILURE:
    return failureReturn;

  case GET_FAILURE:
    return failureReturn;

  case PATCH_FAILURE:
    return failureReturn;

  case POST_FAILURE:
    return failureReturn;

  case GET_SUCCESS:
    return successReturn;

  case POST_SUCCESS: {
    const newUser = action.payload;

    return {
      ...state,
      data: [...state.data, newUser],
      isLoading: false,
    };
  }

  case DELETE_SUCCESS: {
    const {userId} = action.payload;

    return {
      ...state,
      data: state.data.filter(user => user.id !== userId),
      isLoading: false,
    };

    // const removedUser = action.payload as tUser;
    // const userId = removedUser.id;
    // const copy = [...state.data];
    // const indexOfRemovedUser = copy.findIndex(user => userId === user.id);
    // copy.splice(indexOfRemovedUser, 1);

    // return {
    //   ...state,
    //   data: copy,
    //   isLoading: false,
    // };
  }

  case PATCH_SUCCESS: {
    const patchedUser = action.payload as any;
    const userId = parseInt(patchedUser.userId, 10);
    const copy = [...state.data];
    const indexOfPatchedUser = copy.findIndex(user => userId === user.id);
    const userWithNewRole = {
      ...copy[indexOfPatchedUser],
      role: patchedUser.role,
    };

    // replace user in-place with updated relation
    copy.splice(indexOfPatchedUser, 1, userWithNewRole);

    return {
      ...state,
      data: copy,
      isLoading: false,
    };
  }

  default:
    return state;
  }
};
