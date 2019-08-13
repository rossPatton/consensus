import {
  FILE_UPLOAD_BEGIN,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_FAILURE,
  tBeginAction,
  tSuccessAction,
  tFailureAction,
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
