import {
  SET_RSVP_BEGIN,
  SET_RSVP_FAILURE,
  SET_RSVP_SUCCESS,
  tSetBeginAction,
  tSetFailureAction,
  tSetSuccessAction,
} from './_types';

export const setRsvpBegin = (): tSetBeginAction => ({
  type: SET_RSVP_BEGIN,
});

export const setRsvpSuccess = (payload: tRSVP): tSetSuccessAction => ({
  type: SET_RSVP_SUCCESS,
  payload,
});

export const setRsvpFailure = (payload: Error): tSetFailureAction => ({
  type: SET_RSVP_FAILURE,
  payload,
});
