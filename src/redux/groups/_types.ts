import { tFailureAction, tInitAction, tSuccessAction } from './get/_types';
export type tActions = tInitAction | tFailureAction | tSuccessAction;
