import { Route, RouteProps } from 'react-router-dom';

export type SubRouteProps = RouteProps & {
  component: React.ReactNode, // @TODO fix any
  routes: Route[],
};
