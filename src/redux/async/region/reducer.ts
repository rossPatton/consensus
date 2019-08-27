import {
  GET_REGION_BEGIN,
  GET_REGION_FAILURE,
  GET_REGION_SUCCESS,
  tActionUnion,
} from './_types';

const initialState: tThunk<any> = {
  error: null,
  isLoading: false,
  data: {
    cities: [],
    name: '',
  },
};

export const getRegionReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_REGION_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_REGION_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case GET_REGION_FAILURE:
    return {
      ...state,
      data: initialState.data,
      error: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
