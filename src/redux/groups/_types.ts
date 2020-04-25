import { tFailureAction, tInitAction, tSuccessAction } from './get/_types';
export type tActionUnion = tInitAction | tFailureAction | tSuccessAction;
