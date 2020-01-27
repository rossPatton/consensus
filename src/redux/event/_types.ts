import {
  tFailureAction as tDelFailureAction,
  tSuccessAction as tDelSuccessAction,
} from './delete/_types';
import {
  tBeginAction as tGetBeginAction,
  tFailureAction as tGetFailureAction,
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

export type tActionUnion = tGetBeginAction
  | tDelFailureAction
  | tDelSuccessAction
  | tGetFailureAction
  | tGetSuccessAction
  | tPatchFailureAction
  | tPatchSuccessAction
  | tPostFailureAction
  | tPostSuccessAction;
