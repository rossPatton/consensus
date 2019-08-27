import {
  UPDATE_USER_BEGIN,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
} from './actions';

export type tBeginAction = tAction<typeof UPDATE_USER_BEGIN>;
export type tSuccessAction = tAction<typeof UPDATE_USER_SUCCESS, tThunk<tSession>>;
export type tFailureAction = tAction<typeof UPDATE_USER_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;

