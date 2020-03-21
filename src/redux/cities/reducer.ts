import { tCityActionUnion } from './_types';
import { GET_FAILURE, GET_SUCCESS } from './get/_types';

const initialState: tThunk<tCity[]> = {
  error: null,
  fetched: false,
  isLoading: true,
  data: [] as tCity[],
};

export const citiesReducer = (state = initialState, action: tCityActionUnion) => {
  switch (action.type) {
  case GET_SUCCESS:
    return {
      ...state,
      data: action.payload,
      fetched: true,
      isLoading: false,
    };

  case GET_FAILURE:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
