import {
  tFailureAction as tGetFailureAction,
  tInitAction as tGetInitAction,
  tSuccessAction as tGetSuccessAction,
} from './get/_types';
import {
  tFailureAction as tPatchFailureAction,
  tSuccessAction as tPatchSuccessAction,
} from './patch/_types';
import {
  tFailureAction as tPostFailureAction,
  tSuccessAction as tPostSuccessAction,
} from './post/_types';

export type tActionUnion = tGetInitAction
  | tGetFailureAction
  | tGetSuccessAction
  | tPatchFailureAction
  | tPatchSuccessAction
  | tPostFailureAction
  | tPostSuccessAction;
