import {
  tActionUnion,
  GET_EVENT_BY_ID_BEGIN,
  GET_EVENT_BY_ID_SUCCESS,
  GET_EVENT_BY_ID_FAILURE,
} from './_types';

const initialState: tThunk<tEvent> = {
  error: null,
  isLoading: false,
  // @ts-ignore
  data: {},
};

export const getEventByIdReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_EVENT_BY_ID_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_EVENT_BY_ID_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case GET_EVENT_BY_ID_FAILURE:
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
