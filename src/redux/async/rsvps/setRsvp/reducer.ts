import {
  SET_RSVP_BEGIN,
  SET_RSVP_FAILURE,
  SET_RSVP_SUCCESS,
  tSetRSVPUnion,
} from './_types';

const initialState: tThunk<tRSVP> = {
  error: null,
  isLoading: false,
  data: {} as tRSVP,
};

export const setRSVPReducer = (state = initialState, action: tSetRSVPUnion) => {
  switch (action.type) {
  case SET_RSVP_BEGIN:
    return {
      ...state,
      error: null,
      isLoading: true,
    };

  case SET_RSVP_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case SET_RSVP_FAILURE:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
