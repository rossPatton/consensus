import { tCityActionUnion } from './_types';
import { GET_FAILURE, GET_SUCCESS } from './get/_types';

const initialState: tThunk<tCity> = {
  error: null,
  isLoading: true,
  data: {} as tCity,
};

export const cityReducer = (state = initialState, action: tCityActionUnion) => {
  switch (action.type) {
  case GET_SUCCESS:
    return {
      ...state,
      data: action.payload,
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
