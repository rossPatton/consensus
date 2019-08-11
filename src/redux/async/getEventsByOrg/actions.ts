import {
  GET_EVENTS_BY_ORG_BEGIN,
  GET_EVENTS_BY_ORG_SUCCESS,
  GET_EVENTS_BY_ORG_FAILURE,
  tBeginAction,
  tSuccessAction,
  tFailureAction,
} from './_types';

export const getEventsByOrgBegin = (): tBeginAction => ({
  type: GET_EVENTS_BY_ORG_BEGIN,
});

export const getEventsByOrgSuccess = (payload: tEvent[]): tSuccessAction => ({
  type: GET_EVENTS_BY_ORG_SUCCESS,
  payload,
});

export const getEventsByOrgFailure = (payload: Error): tFailureAction => ({
  type: GET_EVENTS_BY_ORG_FAILURE,
  payload,
});
