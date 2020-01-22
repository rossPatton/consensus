import {
  POST_EVENT_BEGIN,
  POST_EVENT_FAILURE,
  POST_EVENT_SUCCESS,
  tActionUnion,
} from './_types';

const initialState: tThunk<tUser | null> = {
  error: null,
  isLoading: false,
  data: null,
};

export const createEventReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case POST_EVENT_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case POST_EVENT_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case POST_EVENT_FAILURE:
    return {
      ...state,
      error: action.payload,
      data: initialState.data,
      isLoading: false,
    };

  default:
    return initialState;
  }
};
