import { Route } from 'react-router-dom';

export interface tProps extends tRoute {
  routes?: Route[],
  session: tSession,
}
