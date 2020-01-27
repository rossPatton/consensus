import { tCountryActionUnion } from './_types';
import { GET_FAILURE, GET_SUCCESS } from './get/_types';

const initialState: tThunk<tCountry> = {
  error: null,
  isLoading: true,
  data: {} as tCountry,
};

export const countryReducer = (state = initialState, action: tCountryActionUnion) => {
  switch (action.type) {
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
      isLoading: false,
    };

  default:
    return state;
  }
};
