import {
  tBeginAction as tDelBeginAction,
  tFailureAction as tDelFailureAction,
  tSuccessAction as tDelSuccessAction,
} from './deleteUserFromOrg/_types';
import {
  tBeginAction as tGetBeginAction,
  tFailureAction as tGetFailureAction,
  tSuccessAction as tGetSuccessAction,
} from './getUsersByOrg/_types';
import {
  tBeginAction as tPatchBeginAction,
  tFailureAction as tPatchFailureAction,
  tSuccessAction as tPatchSuccessAction,
} from './patchUserByOrg/_types';
import {
  tBeginAction as tPostBeginAction,
  tFailureAction as tPostFailureAction,
  tSuccessAction as tPostSuccessAction,
} from './postUserToOrg/_types';

export type tActionUnion = tDelBeginAction
  | tDelFailureAction
  | tDelSuccessAction
  | tGetBeginAction
  | tGetFailureAction
  | tGetSuccessAction
  | tPatchBeginAction
  | tPatchFailureAction
  | tPatchSuccessAction
  | tPostBeginAction
  | tPostFailureAction
  | tPostSuccessAction;
