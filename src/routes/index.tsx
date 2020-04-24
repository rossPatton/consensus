import {Admin} from './Admin';
import {Categories} from './Categories';
import {Directory} from './Directory';
import {Draft} from './Draft';
import {ErrorPage} from './ErrorPage';
import {Group} from './Group';
import {Home} from './Home';
import {Login} from './Login';
import {Meeting} from './Meeting';
import {NoMatch} from './NoMatch';
import {PasswordReset} from './PasswordReset';
import {Search} from './Search';
import {Signup} from './Signup';
import {UnAuthorized} from './UnAuthorized';
import {User} from './User';
import {VerifyAccount} from './VerifyAccount';

export const routes = [
  Admin,
  Categories,
  Directory,
  Draft,
  ErrorPage,
  Meeting,
  Home,
  Login,
  Group,
  PasswordReset,
  Search,
  Signup,
  UnAuthorized,
  User,
  VerifyAccount,
  // NoMatch === our 404 page, or fallback page
  // any match that we can't find, 404, or else we can manually redirect to /404
  NoMatch,
];
