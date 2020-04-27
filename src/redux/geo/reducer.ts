import { tActions } from './_types';
import { GET_FAILURE, GET_INIT, GET_SUCCESS } from './get/_types';

export const initialState: tThunk<tGeo> = {
  error: null,
  fetched: false,
  isLoading: false,
  data: {} as tGeo,
};

export const geoReducer = (state = initialState, action: tActions) => {
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
      isLoading: false,
    };

  case GET_SUCCESS:
    return {
      ...state,
      data: action.payload,
      fetched: true,
      isLoading: false,
    };

  default:
    return state;
  }
};
