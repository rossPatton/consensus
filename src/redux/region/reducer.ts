import { tRegionActionUnion } from './_types';
import { GET_FAILURE, GET_SUCCESS } from './get/_types';

const initialState: tThunk<tRegion> = {
  error: null,
  fetched: true,
  isLoading: true,
  data: {} as tRegion,
};

export const regionReducer = (state = initialState, action: tRegionActionUnion) => {
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
      fetched: true,
      data: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
