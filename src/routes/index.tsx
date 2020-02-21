import {Admin} from './Admin';
import {Categories} from './Categories';
import {Directory} from './Directory';
import {ErrorPage} from './ErrorPage';
import {Event} from './Event';
import {Home} from './Home';
import {Login} from './Login';
import {NoMatch} from './NoMatch';
import {Organization} from './Organization';
import {PasswordReset} from './PasswordReset';
import {Search} from './Search';
import {Signup} from './Signup';
import {UnAuthorized} from './UnAuthorized';
import {User} from './User';

export const routes = [
  Admin,
  Categories,
  Directory,
  ErrorPage,
  Event,
  Home,
  Login,
  Organization,
  PasswordReset,
  Search,
  Signup,
  UnAuthorized,
  User,
  // NoMatch === our 404 page, or fallback page
  // any match that we can't find, 404, or else we can manually redirect to /404
  NoMatch,
];
