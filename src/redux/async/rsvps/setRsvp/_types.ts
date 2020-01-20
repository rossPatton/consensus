export const SET_RSVP_BEGIN = 'SET_RSVP_BEGIN';
export const SET_RSVP_SUCCESS = 'SET_RSVP_SUCCESS';
export const SET_RSVP_FAILURE = 'SET_RSVP_FAILURE';

export type tSetBeginAction = tAction<typeof SET_RSVP_BEGIN>;
export type tSetSuccessAction = tAction<typeof SET_RSVP_SUCCESS, tRSVP>;
export type tSetFailureAction = tAction<typeof SET_RSVP_FAILURE, Error>;

export type tSetActionUnion = tSetBeginAction
  | tSetSuccessAction
  | tSetFailureAction;

export type tSetRSVPUnion = tSetActionUnion;
