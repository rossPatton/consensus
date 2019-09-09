import {
  DELETE_EVENT_BEGIN,
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_SUCCESS,
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
  case DELETE_EVENT_BEGIN || GET_EVENTS_BEGIN:
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

  case DELETE_EVENT_FAILURE || GET_EVENTS_FAILURE:
    return {
      ...state,
      data: initialState.data,
      error: action.payload,
      isLoading: false,
    };

  case DELETE_EVENT_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
