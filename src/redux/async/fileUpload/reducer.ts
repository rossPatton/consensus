import {
  FILE_UPLOAD_BEGIN,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_FAILURE,
  tActionUnion,
} from './_types';

const initialState: tThunk<tUser | null> = {
  error: null,
  isLoading: false,
  data: null,
};

export const fileUploadReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case FILE_UPLOAD_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case FILE_UPLOAD_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case FILE_UPLOAD_FAILURE:
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
