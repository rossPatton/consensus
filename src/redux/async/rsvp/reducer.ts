import {
  GET_RSVP_BEGIN,
  GET_RSVP_FAILURE,
  GET_RSVP_SUCCESS,
  SET_RSVP_BEGIN,
  SET_RSVP_FAILURE,
  SET_RSVP_SUCCESS,
  tSessionUnion,
} from './_types';

const initialState: tThunk<any> = {
  error: null,
  isLoading: false,
  data: {},
};

export const rsvpReducer = (state = initialState, action: tSessionUnion) => {
  switch (action.type) {
  case GET_RSVP_BEGIN:
    return {
      ...state,
      error: null,
      isLoading: true,
    };

  case GET_RSVP_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case GET_RSVP_FAILURE:
    return {
      data: {},
      error: action.payload,
      isLoading: false,
    };

  /* eslint-disable */
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
  /* eslint-enable */

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
