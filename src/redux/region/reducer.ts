import { tActions } from './_types';
import { GET_FAILURE, GET_INIT, GET_SUCCESS } from './get/_types';

export const initialState: tThunk<tRegion> = {
  error: null,
  fetched: true,
  isLoading: false,
  data: {} as tRegion,
};

export const regionReducer = (state = initialState, action: tActions) => {
  switch (action.type) {
  case GET_INIT:
    return {
      ...state,
      isLoading: true,
    };

  case GET_FAILURE:
    return {
      ...state,
      error: action.payload,
    };

  case GET_SUCCESS:
    return {
      ...state,
      fetched: true,
      data: action.payload,
    };

  default:
    return state;
  }
};
