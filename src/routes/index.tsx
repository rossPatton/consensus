import {Admin} from './Admin';
import {Decision} from './Decision';
import {Directory} from './Directory';
import {ErrorPage} from './ErrorPage';
import {Event} from './Event';
import {Home} from './Home';
import {Login} from './Login';
import {NoMatch} from './NoMatch';
import {Organization} from './Organization';
import {Signup} from './Signup';
import {User} from './User';

// TODO eventually split this file up once it starts getting big
export const routes = [
  Admin,
  Decision,
  Directory,
  ErrorPage,
  Event,
  Home,
  Login,
  Signup,
  Organization,
  User,
  // NoMatch === our 404 page, or fallback page
  // any match that we can't find, 404, or else we can manually redirect to /404
  NoMatch,
];
