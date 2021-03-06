import {Admin} from './Admin';
import {Categories} from './Categories';
import {Contact} from './Contact';
import {Directory} from './Directory';
import {Draft} from './Draft';
import {ErrorPage} from './ErrorPage';
import {Group} from './Group';
import {Home} from './Home';
import {Login} from './Login';
import {Meeting} from './Meeting';
import {NoMatch} from './NoMatch';
import {Privacy} from './Privacy';
import {Search} from './Search';
import {Signup} from './Signup';
import {Terms} from './Terms';
import {UnAuthorized} from './UnAuthorized';
import {User} from './User';

export const routes = [
  Admin,
  Categories,
  Contact,
  Directory,
  Draft,
  ErrorPage,
  Group,
  Home,
  Login,
  Meeting,
  Privacy,
  Search,
  Signup,
  Terms,
  UnAuthorized,
  User,
  // NoMatch === our 404 page, or fallback page
  // any match that we can't find, 404, or else we can manually redirect to /404
  NoMatch,
];
