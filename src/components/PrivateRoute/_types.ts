import { Route } from 'react-router-dom';

export interface tProps extends ts.route {
  routes?: Route[],
  session: ts.session,
}
