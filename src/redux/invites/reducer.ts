import {tActions} from './_types';
import {DELETE_FAILURE, DELETE_INIT, DELETE_SUCCESS} from './delete/_types';
import {GET_FAILURE, GET_INIT, GET_SUCCESS} from './get/_types';
import {POST_FAILURE, POST_INIT, POST_SUCCESS} from './post/_types';

export const initialState: ts.thunk<ts.userInvite[]> = {
  error: null,
  fetched: false,
  isLoading: false,
  data: [],
};

export const invitesReducer = (state = initialState, action: tActions) => {
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

  const initReturn = {
    ...state,
    isLoading: true,
  };

  switch (action.type) {
  case DELETE_INIT:
    return initReturn;
  case GET_INIT:
    return initReturn;
  case POST_INIT:
    return initReturn;

  case DELETE_FAILURE:
    return failureReturn;
  case GET_FAILURE:
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
    const {id}: {id: unknown} = action.payload;
    const data = state.data.filter(userInvite => {
      return userInvite.id !== parseInt(id as string, 10);
    });

    return {
      ...state,
      data,
      isLoading: false,
    };
  }

  default:
    return state;
  }
};
