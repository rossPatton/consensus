import {
  GET_EVENTS_BEGIN,
  GET_EVENTS_FAILURE,
  GET_EVENTS_SUCCESS,
  tActionUnion,
} from './_types';

const initialState: tThunk<tEvent[]> = {
  error: null,
  isLoading: false,
  data: [],
};

export const eventsReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_EVENTS_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_EVENTS_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case GET_EVENTS_FAILURE:
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