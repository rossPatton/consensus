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
import {Search} from './Search';
import {Signup} from './Signup';
import {UnAuthorized} from './UnAuthorized';
import {User} from './User';

export const routes = [
  Admin,
  Categories,
  Directory,
  Draft,
  ErrorPage,
  Group,
  Home,
  Login,
  Meeting,
  Search,
  Signup,
  UnAuthorized,
  User,
  // NoMatch === our 404 page, or fallback page
  // any match that we can't find, 404, or else we can manually redirect to /404
  NoMatch,
];
