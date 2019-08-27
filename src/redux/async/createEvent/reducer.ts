import {
  CREATE_EVENT_BEGIN,
  CREATE_EVENT_FAILURE,
  CREATE_EVENT_SUCCESS,
  tActionUnion,
} from './_types';

const initialState: tThunk<tUser | null> = {
  error: null,
  isLoading: false,
  data: null,
};

export const createEventReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case CREATE_EVENT_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case CREATE_EVENT_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case CREATE_EVENT_FAILURE:
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
