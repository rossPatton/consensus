import { tOrgActionUnion } from './_types';
import { GET_FAILURE, GET_SUCCESS } from './get/_types';
import { PATCH_FAILURE, PATCH_SUCCESS } from './patch/_types';
import { POST_FAILURE, POST_SUCCESS } from './post/_types';

const initialState: tThunk<tOrg> = {
  error: null,
  isLoading: true,
  data: {} as tOrg,
};

export const orgReducer = (state = initialState, action: tOrgActionUnion) => {
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
  case PATCH_FAILURE:
    return failureReturn;
  case POST_FAILURE:
    return failureReturn;

  case GET_SUCCESS:
    return successReturn;
  case PATCH_SUCCESS:
    return successReturn;
  case POST_SUCCESS:
    return successReturn;

  default:
    return state;
  }
};
