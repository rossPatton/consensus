import {
  GET_RSVPS_BEGIN,
  GET_RSVPS_FAILURE,
  GET_RSVPS_SUCCESS,
  SET_RSVP_BEGIN,
  SET_RSVP_FAILURE,
  SET_RSVP_SUCCESS,
  tSessionUnion,
} from './_types';

const initialState: tThunk<any> = {
  error: null,
  isLoading: false,
  data: [],
};

export const rsvpsReducer = (state = initialState, action: tSessionUnion) => {
  switch (action.type) {
  case GET_RSVPS_BEGIN || SET_RSVP_BEGIN:
    return {
      ...state,
      error: null,
      isLoading: true,
    };

  case GET_RSVPS_SUCCESS || SET_RSVP_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case GET_RSVPS_FAILURE || SET_RSVP_FAILURE:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

    /* eslint-disable */
  // case SET_RSVP_BEGIN:
  //   return {
  //     ...state,
  //     error: null,
  //     isLoading: true,
  //   };

  // case SET_RSVP_SUCCESS:
  //   return {
  //     ...state,
  //     data: action.payload,
  //     isLoading: false,
  //   };

  // case SET_RSVP_FAILURE:
  //   return {
  //     ...state,
  //     error: action.payload,
  //     isLoading: false,
  //   };
    /* eslint-enable */

  default:
    return state;
  }
};
