import { tGeoActionUnion } from './_types';
import { GET_FAILURE, GET_SUCCESS } from './get/_types';

const initialState: tThunk<tGeo> = {
  error: null,
  isLoading: true,
  data: {} as tGeo,
};

export const geoReducer = (state = initialState, action: tGeoActionUnion) => {
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