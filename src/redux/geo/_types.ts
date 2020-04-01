import { tFailureAction, tInitAction, tSuccessAction } from './get/_types';
export type tGeoActionUnion = tFailureAction | tInitAction | tSuccessAction;
