import { Route, RouteProps } from 'react-router-dom';

export type SubRouteProps = RouteProps & {
  component: any, // @TODO fix any
  routes: Route[],
};
