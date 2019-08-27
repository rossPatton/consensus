import {
  GET_COUNTRY_BEGIN,
  GET_COUNTRY_FAILURE,
  GET_COUNTRY_SUCCESS,
  tActionUnion,
} from './_types';

const initialState: tThunk<any> = {
  error: null,
  isLoading: false,
  data: {
    code: '',
    name: '',
    regions: [],
  },
};

export const getCountryReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_COUNTRY_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_COUNTRY_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case GET_COUNTRY_FAILURE:
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
