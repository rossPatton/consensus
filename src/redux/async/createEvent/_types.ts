export const CREATE_EVENT_BEGIN = 'CREATE_EVENT_BEGIN';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

export type tBeginAction = tAction<typeof CREATE_EVENT_BEGIN>;
export type tSuccessAction = tAction<typeof CREATE_EVENT_SUCCESS, tThunk<tEvent>>;
export type tFailureAction = tAction<typeof CREATE_EVENT_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
