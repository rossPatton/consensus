import { GET_USERS_BEGIN, GET_USERS_SUCCESS, GET_USERS_FAILURE } from './actions';

export type tBeginAction = tAction<typeof GET_USERS_BEGIN>;
export type tSuccessAction = tAction<typeof GET_USERS_SUCCESS, tThunk<tUser[]>>;
export type tFailureAction = tAction<typeof GET_USERS_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
