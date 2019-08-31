import {
  GET_EVENTS_BEGIN,
  GET_EVENTS_FAILURE,
  GET_EVENTS_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

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
