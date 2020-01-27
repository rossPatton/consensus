import {
  tFailureAction as tLoginFailureAction,
  tSuccessAction as tLoginSuccessAction,
} from './login/_types';
import {
  tFailureAction as tLogoutFailureAction,
  tSuccessAction as tLogoutSuccessAction,
} from './logout/_types';

export type tAuthActionUnion = tLoginFailureAction
  | tLoginSuccessAction
  | tLogoutFailureAction
  | tLogoutSuccessAction;
