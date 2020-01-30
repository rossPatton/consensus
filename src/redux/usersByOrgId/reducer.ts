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
  }

  case PATCH_SUCCESS: {
    const {userId} = action.payload as tAccountRoleRelation;

    return {
      ...state,
      data: [...state.data].map(user => {
        if (user.id === userId) {
          return {
            ...user,
            role: action.payload.role,
          };
        }

        return user;
      }),
      isLoading: false,
    };
  }

  default:
    return state;
  }
};
