import { tRsvpsActionUnion } from './_types';
import { GET_FAILURE, GET_SUCCESS } from './get/_types';
import { PATCH_FAILURE, PATCH_SUCCESS } from './patch/_types';
import { POST_FAILURE, POST_SUCCESS } from './post/_types';

const initialState: tThunk<tRSVP[]> = {
  error: null,
  isLoading: true,
  data: [],
};

export const rsvpsReducer = (state = initialState, action: tRsvpsActionUnion) => {
  const failureReturn = {
    ...state,
    error: action.payload,
    isLoading: false,
  };

  const successReturn = {
    ...state,
    data: action.payload,
    isLoading: false,
  };

  switch (action.type) {
  case GET_FAILURE:
    return failureReturn;

  case PATCH_FAILURE:
    return failureReturn;

  case POST_FAILURE:
    return failureReturn;

  case GET_SUCCESS:
    return successReturn;

  case PATCH_SUCCESS: {
    const newRSVP = action.payload;
    const data = state.data.map(rsvp => {
      if (rsvp.id === newRSVP.id) return newRSVP;
      return rsvp;
    });

    return {
      ...state,
      data,
      isLoading: false,
    };
  }

  case POST_SUCCESS: {
    const newRSVP = action.payload;
    return {
      ...state,
      data: [...state.data, newRSVP],
      isLoading: false,
    };
  }

  default:
    return state;
  }
};
