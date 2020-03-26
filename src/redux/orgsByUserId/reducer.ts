import { tGroupsByUserIdActionUnion } from './_types';
import { DELETE_FAILURE, DELETE_SUCCESS } from './delete/_types';
import { GET_FAILURE, GET_SUCCESS } from './get/_types';

const initialState: tThunk<tGroup[]> = {
  error: null,
  fetched: false,
  isLoading: true,
  data: [] as tGroup[],
};

export const orgsByUserIdReducer = (
  state = initialState,
  action: tGroupsByUserIdActionUnion,
) => {
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
  case DELETE_FAILURE:
    return failureReturn;

  case GET_FAILURE:
    return failureReturn;

  case GET_SUCCESS:
    return successReturn;

  case DELETE_SUCCESS: {
    const {orgId} = action.payload;

    return {
      ...state,
      data: state.data.filter(org => org.id !== orgId),
      isLoading: false,
    };
  }

  default:
    return state;
  }
};
