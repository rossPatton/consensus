import {
  POST_EVENT_BEGIN,
  POST_EVENT_FAILURE,
  POST_EVENT_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';


export const postEventBegin = (): tBeginAction => ({
  type: POST_EVENT_BEGIN,
});

export const postEventSuccess = (payload: tEvent): tSuccessAction => ({
  type: POST_EVENT_SUCCESS,
  payload,
});

export const postEventFailure = (payload: Error): tFailureAction => ({
  type: POST_EVENT_FAILURE,
  payload,
});
