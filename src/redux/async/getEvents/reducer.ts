import {
  tActionUnion,
  GET_EVENTS_BEGIN,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
} from './_types';

const initialState: tThunk<tEvent[]> = {
  error: null,
  isLoading: false,
  data: [],
};

export const getEventsReducer = (state = initialState, action: tActionUnion) => {
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
