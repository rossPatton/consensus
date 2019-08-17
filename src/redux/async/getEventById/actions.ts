import {
  GET_EVENT_BY_ID_BEGIN,
  GET_EVENT_BY_ID_SUCCESS,
  GET_EVENT_BY_ID_FAILURE,
  tBeginAction,
  tSuccessAction,
  tFailureAction,
} from './_types';

export const getEventByIdBegin = (): tBeginAction => ({
  type: GET_EVENT_BY_ID_BEGIN,
});

export const getEventByIdSuccess = (payload: tEvent): tSuccessAction => ({
  type: GET_EVENT_BY_ID_SUCCESS,
  payload,
});

export const getEventByIdFailure = (payload: Error): tFailureAction => ({
  type: GET_EVENT_BY_ID_FAILURE,
  payload,
});
