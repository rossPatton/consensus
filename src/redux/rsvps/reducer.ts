import { tActions } from './_types';
import { GET_FAILURE, GET_INIT, GET_SUCCESS } from './get/_types';
import { PATCH_FAILURE, PATCH_INIT, PATCH_SUCCESS } from './patch/_types';
import { POST_FAILURE, POST_INIT, POST_SUCCESS } from './post/_types';

export const initialState: tThunk<tRSVP[]> = {
  error: null,
  fetched: false,
  isLoading: false,
  data: [],
};

export const rsvpsReducer = (state = initialState, action: tActions) => {
  const failureReturn = {
    ...state,
    error: action.payload,
    isLoading: false,
  };

  const successReturn = {
    ...state,
    data: action.payload,
    fetched: true,
    isLoading: false,
  };

  const initReturn = {
    ...state,
    isLoading: true,
  };

  switch (action.type) {
  case GET_INIT:
    return initReturn;
  case PATCH_INIT:
    return initReturn;
  case POST_INIT:
    return initReturn;

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
    };
  }

  case POST_SUCCESS: {
    const newRSVP = action.payload;
    return {
      ...state,
      data: [...state.data, newRSVP],
    };
  }

  default:
    return state;
  }
};
