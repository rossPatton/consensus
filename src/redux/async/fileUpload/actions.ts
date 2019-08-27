import {
  FILE_UPLOAD_BEGIN,
  FILE_UPLOAD_FAILURE,
  FILE_UPLOAD_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';


export const fileUploadBegin = (): tBeginAction => ({
  type: FILE_UPLOAD_BEGIN,
});

export const fileUploadSuccess = (payload: tThunk<any>): tSuccessAction => ({
  type: FILE_UPLOAD_SUCCESS,
  payload,
});

export const fileUploadFailure = (payload: Error): tFailureAction => ({
  type: FILE_UPLOAD_FAILURE,
  payload,
});
