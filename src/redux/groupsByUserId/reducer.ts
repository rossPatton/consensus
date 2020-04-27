import { tActions } from './_types';
import { DELETE_FAILURE, DELETE_INIT, DELETE_SUCCESS } from './delete/_types';
import { GET_FAILURE, GET_INIT, GET_SUCCESS } from './get/_types';

export const initialState: ts.thunk<ts.group[]> = {
  error: null,
  fetched: false,
  isLoading: false,
  data: [] as ts.group[],
};

export const groupsByUserIdReducer = (state = initialState, action: tActions) => {
  const initReturn = {
    ...state,
    isLoading: true,
  };

  const failureReturn = {
    ...state,
    error: action.payload,
    isLoading: false,
  };

  const successReturn = {
    ...state,
    fetched: true,
    data: action.payload,
    isLoading: false,
  };

  switch (action.type) {
  case DELETE_INIT:
    return initReturn;
  case GET_INIT:
    return initReturn;

  case DELETE_FAILURE:
    return failureReturn;
  case GET_FAILURE:
    return failureReturn;

  case GET_SUCCESS:
    return successReturn;

  case DELETE_SUCCESS: {
    const {groupId} = action.payload;

    return {
      ...state,
      data: state.data.filter(group => group.id !== groupId),
      isLoading: false,
    };
  }

  default:
    return state;
  }
};
