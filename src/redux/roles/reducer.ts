import _ from 'lodash';

import { tActions } from './_types';
import { DELETE_FAILURE, DELETE_INIT, DELETE_SUCCESS } from './delete/_types';
import { GET_FAILURE, GET_INIT, GET_SUCCESS } from './get/_types';
import { POST_FAILURE, POST_INIT, POST_SUCCESS } from './post/_types';

export const initialState: tThunk<ts.roleMap[]> = {
  error: null,
  fetched: false,
  isLoading: false,
  data: [],
};

export const rolesReducer = (state = initialState, action: tActions) => {
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
    data: action.payload,
    fetched: true,
    isLoading: false,
  };

  switch (action.type) {
  case GET_INIT:
    return initReturn;
  case DELETE_INIT:
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
    return successReturn;

  case POST_SUCCESS: {
    const {groupId, role} = action.payload;
    const data = [...state.data, {groupId, role}];

    return {
      ...state,
      data,
    };
  }

  case DELETE_SUCCESS: {
    const {groupId} = action.payload;
    const copy = [...state.data];
    const data = _.filter(copy, (r: ts.roleMap) => groupId !== r.groupId);

    return {
      ...state,
      data,
    };
  }

  default:
    return state;
  }
};
