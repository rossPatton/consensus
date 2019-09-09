import {
  DELETE_EVENT_BEGIN,
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_SUCCESS,
  GET_EVENTS_BEGIN,
  GET_EVENTS_FAILURE,
  GET_EVENTS_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const deleteEventBegin = (): tBeginAction => ({
  type: DELETE_EVENT_BEGIN,
});

export const deleteEventSuccess = (payload: tEvent[]): tSuccessAction => ({
  type: DELETE_EVENT_SUCCESS,
  payload,
});

export const deleteEventFailure = (payload: Error): tFailureAction => ({
  type: DELETE_EVENT_FAILURE,
  payload,
});

export const getEventsBegin = (): tBeginAction => ({
  type: GET_EVENTS_BEGIN,
});

export const getEventsSuccess = (payload: tEvent[]): tSuccessAction => ({
  type: GET_EVENTS_SUCCESS,
  payload,
});

export const getEventsFailure = (payload: Error): tFailureAction => ({
  type: GET_EVENTS_FAILURE,
  payload,
});
