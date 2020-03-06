import {
  tFailureAction as tLoginFailureAction,
  tSuccessAction as tLoginSuccessAction,
} from './login/_types';
import {
  tFailureAction as tLogoutFailureAction,
  tSuccessAction as tLogoutSuccessAction,
} from './logout/_types';
import {
  tFailureAction as tPatchFailureAction,
  tSuccessAction as tPatchSuccessAction,
} from './patch/_types';

export type tActionUnion = tLoginFailureAction
  | tLoginSuccessAction
  | tLogoutFailureAction
  | tLogoutSuccessAction
  | tPatchFailureAction
  | tPatchSuccessAction;
