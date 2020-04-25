import {
  tFailureAction as tGetFailureAction,
  tInitAction as tGetInitAction,
  tSuccessAction as tGetSuccessAction,
} from './get/_types';
import {
  tFailureAction as tPatchFailureAction,
  tInitAction as tPatchInitAction,
  tSuccessAction as tPatchSuccessAction,
} from './patch/_types';
import {
  tFailureAction as tPostFailureAction,
  tInitAction as tPostInitAction,
  tSuccessAction as tPostSuccessAction,
} from './post/_types';

export type tActions = tGetInitAction
  | tGetFailureAction
  | tGetSuccessAction
  | tPatchInitAction
  | tPatchFailureAction
  | tPatchSuccessAction
  | tPostInitAction
  | tPostFailureAction
  | tPostSuccessAction;
