import {
  tActionUnion,
  GET_CITY_BEGIN,
  GET_CITY_SUCCESS,
  GET_CITY_FAILURE,
} from './_types';

const initialState: tThunk<any> = {
  error: null,
  isLoading: false,
  data: {
    name: '',
    orgs: [],
  },
};

export const getCityReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_CITY_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_CITY_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case GET_CITY_FAILURE:
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
