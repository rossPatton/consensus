import _ from 'lodash';

import { tRolesActionUnion } from './_types';
import { DELETE_FAILURE, DELETE_SUCCESS } from './delete/_types';
import { GET_FAILURE, GET_INIT, GET_SUCCESS } from './get/_types';
import { POST_FAILURE, POST_SUCCESS } from './post/_types';

const initialState: tThunk<tRoleMap[]> = {
  error: null,
  fetched: false,
  isLoading: true,
  data: [],
};

export const rolesReducer = (state = initialState, action: tRolesActionUnion) => {
  const failureReturn = {
    ...state,
    error: action.payload,
    isLoading: false,
  };

  const successReturn = {
    ...state,
    data: action.payload,
    isLoading: false,
    fetched: true,
  };

  switch (action.type) {
  case GET_INIT:
    return {
      ...state,
      isLoading: true,
    };

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
      isLoading: false,
    };
  }

  case DELETE_SUCCESS: {
    const {groupId} = action.payload;
    const copy = [...state.data];
    const data = _.filter(copy, (r: tRoleMap) => groupId !== r.groupId);

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
