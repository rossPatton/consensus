export const DELETE_EVENT_BEGIN = 'DELETE_EVENT_BEGIN';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

export const GET_EVENTS_BEGIN = 'GET_EVENTS_BEGIN';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';

export type tBeginAction = tAction<typeof GET_EVENTS_BEGIN | typeof DELETE_EVENT_BEGIN>;

export type tSuccessAction = tAction<
  typeof GET_EVENTS_SUCCESS
  | typeof DELETE_EVENT_SUCCESS,
  tEvent[]
>;

export type tFailureAction = tAction<
  typeof GET_EVENTS_FAILURE
  | typeof DELETE_EVENT_FAILURE,
  Error
>;

export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
