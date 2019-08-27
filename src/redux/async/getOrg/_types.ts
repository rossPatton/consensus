import { GET_ORG_BEGIN, GET_ORG_FAILURE, GET_ORG_SUCCESS } from './actions';

export type tBeginAction = tAction<typeof GET_ORG_BEGIN>;
export type tSuccessAction = tAction<typeof GET_ORG_SUCCESS, tThunk<tOrg>>;
export type tFailureAction = tAction<typeof GET_ORG_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
