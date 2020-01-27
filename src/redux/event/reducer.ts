// TODO actually please simplify somehow
import { tActionUnion } from './_types';
import { DELETE_FAILURE, DELETE_SUCCESS } from './delete/_types';
import { GET_BEGIN, GET_FAILURE, GET_SUCCESS } from './get/_types';
import { PATCH_FAILURE, PATCH_SUCCESS } from './patch/_types';
import { POST_FAILURE, POST_SUCCESS } from './post/_types';

const initialState: tThunk<tEvent> = {
  error: null,
  isLoading: false,
  data: {} as tEvent,
};

export const eventReducer = (state = initialState, action: tActionUnion) => {
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
  case GET_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case DELETE_FAILURE:
    return failureReturn;
  case GET_FAILURE:
    return failureReturn;
  case PATCH_FAILURE:
    return failureReturn;
  case POST_FAILURE:
    return failureReturn;

  case DELETE_SUCCESS:
    return successReturn;
  case GET_SUCCESS:
    return successReturn;
  case PATCH_SUCCESS:
    return successReturn;
  case POST_SUCCESS:
    return successReturn;

  default:
    return initialState;
  }
};
