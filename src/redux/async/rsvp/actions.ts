import {
  GET_RSVP_BEGIN,
  GET_RSVP_FAILURE,
  GET_RSVP_SUCCESS,
  SET_RSVP_BEGIN,
  SET_RSVP_FAILURE,
  SET_RSVP_SUCCESS,
  tGetBeginAction,
  tGetFailureAction,
  tGetSuccessAction,
  tSetBeginAction,
  tSetFailureAction,
  tSetSuccessAction,
} from './_types';

export const getRsvpBegin = (): tGetBeginAction => ({
  type: GET_RSVP_BEGIN,
});

export const getRsvpSuccess = (payload: any): tGetSuccessAction => ({
  type: GET_RSVP_SUCCESS,
  payload,
});

export const getRsvpFailure = (payload: Error): tGetFailureAction => ({
  type: GET_RSVP_FAILURE,
  payload,
});

export const setRsvpBegin = (): tSetBeginAction => ({
  type: SET_RSVP_BEGIN,
});

export const setRsvpSuccess = (payload: any): tSetSuccessAction => ({
  type: SET_RSVP_SUCCESS,
  payload,
});

export const setRsvpFailure = (payload: Error): tSetFailureAction => ({
  type: SET_RSVP_FAILURE,
  payload,
});
