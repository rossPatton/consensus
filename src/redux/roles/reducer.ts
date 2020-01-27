import { tRolesActionUnion } from './_types';
import { GET_FAILURE, GET_SUCCESS } from './get/_types';
import { POST_FAILURE, POST_SUCCESS } from './post/_types';

const initialState: tThunk<tRoleMap[]> = {
  error: null,
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
  };

  switch (action.type) {
  case GET_FAILURE:
    return failureReturn;

  case POST_FAILURE:
    return failureReturn;

  case GET_SUCCESS:
    return successReturn;

  case POST_SUCCESS: {
    const {orgId, role} = action.payload;
    const data = [...state.data, {orgId, role}];

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
