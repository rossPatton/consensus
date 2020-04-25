import { tCitiesActionUnion } from './_types';
import { GET_FAILURE, GET_INIT, GET_SUCCESS } from './get/_types';

export const initialState: tThunk<tCity[]> = {
  error: null,
  fetched: false,
  isLoading: false,
  data: [] as tCity[],
};

export const citiesReducer = (state = initialState, action: tCitiesActionUnion) => {
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
