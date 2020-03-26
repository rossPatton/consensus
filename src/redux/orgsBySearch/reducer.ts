import { tSearchActionUnion } from './_types';
import { GET_FAILURE, GET_SUCCESS } from './get/_types';

const initialState: tThunk<tGroup[]> = {
  error: null,
  fetched: false,
  isLoading: true,
  data: [],
};

export const orgsBySearchReducer =
  (state = initialState, action: tSearchActionUnion) => {
    switch (action.type) {
    case GET_SUCCESS: {
      return {
        ...state,
        fetched: true,
        data: action.payload,
        isLoading: false,
      };
    }

    case GET_FAILURE:
      return {
        data: [] as tGroup[],
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
    }
  };
