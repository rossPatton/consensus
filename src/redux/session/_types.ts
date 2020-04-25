import {
  tFailureAction as tLoginFailureAction,
  tInitAction as tLoginInitAction,
  tSuccessAction as tLoginSuccessAction,
} from './login/_types';
import {
  tFailureAction as tLogoutFailureAction,
  tInitAction as tLogoutInitAction,
  tSuccessAction as tLogoutSuccessAction,
} from './logout/_types';
import {
  tFailureAction as tPatchFailureAction,
  tSuccessAction as tPatchSuccessAction,
} from './patch/_types';

export type tActions = tLoginInitAction
  | tLoginFailureAction
  | tLoginSuccessAction
  | tLogoutInitAction
  | tLogoutFailureAction
  | tLogoutSuccessAction
  | tPatchFailureAction
  | tPatchSuccessAction;
