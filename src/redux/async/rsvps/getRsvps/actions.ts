import {
  GET_RSVPS_BEGIN,
  GET_RSVPS_FAILURE,
  GET_RSVPS_SUCCESS,
  tGetBeginAction,
  tGetFailureAction,
  tGetSuccessAction,
} from './_types';

export const getRsvpBegin = (): tGetBeginAction => ({
  type: GET_RSVPS_BEGIN,
});

export const getRsvpSuccess = (payload: tRSVP[]): tGetSuccessAction => ({
  type: GET_RSVPS_SUCCESS,
  payload,
});

export const getRsvpFailure = (payload: Error): tGetFailureAction => ({
  type: GET_RSVPS_FAILURE,
  payload,
});
