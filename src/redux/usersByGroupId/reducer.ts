import {tActions} from './_types';
import {DELETE_FAILURE, DELETE_INIT, DELETE_SUCCESS} from './delete/_types';
import {GET_FAILURE, GET_INIT, GET_SUCCESS} from './get/_types';
import {PATCH_FAILURE, PATCH_INIT, PATCH_SUCCESS} from './patch/_types';
import {POST_FAILURE, POST_INIT, POST_SUCCESS} from './post/_types';

export const initialState: tThunk<tUser[]> = {
  error: null,
  fetched: false,
  isLoading: false,
  data: [],
};

export const usersByGroupIdReducer = (state = initialState, action: tActions) => {
  const failureReturn = {
    ...state,
    error: action.payload,
  };

  const successReturn = {
    ...state,
    data: action.payload,
  };

  const initReturn = {
    ...state,
    isLoading: true,
  };

  switch (action.type) {
  case DELETE_INIT:
    return initReturn;
  case GET_INIT:
    return initReturn;
  case PATCH_INIT:
    return initReturn;
  case POST_INIT:
    return initReturn;

  case DELETE_FAILURE:
    return failureReturn;
  case GET_FAILURE:
    return failureReturn;
  case PATCH_FAILURE:
    return failureReturn;
  case POST_FAILURE:
    return failureReturn;

  case GET_SUCCESS:
    return {
      ...successReturn,
      fetched: true,
    };

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
    const {userId} = action.payload;

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
