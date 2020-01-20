import {
  GET_RSVPS_BEGIN,
  GET_RSVPS_FAILURE,
  GET_RSVPS_SUCCESS,
  tGetRSVPUnion,
} from './_types';

const initialState: tThunk<tRSVP[]> = {
  error: null,
  isLoading: false,
  data: [],
};

export const rsvpsReducer = (state = initialState, action: tGetRSVPUnion) => {
  switch (action.type) {
  case GET_RSVPS_BEGIN:
    return {
      ...state,
      error: null,
      isLoading: true,
    };

  case GET_RSVPS_SUCCESS: {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };
  }

  case GET_RSVPS_FAILURE:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
