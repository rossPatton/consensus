import { Route, RouteProps } from 'react-router-dom';

export interface tProps {
  getGeoDispatch: () => tThunkPayload<tGeo>,
  session: tSession,
}

export type tStore = {
  session: tThunk<tSession>,
}

export type SubRouteProps = RouteProps & {
  component: React.ReactNode, // @TODO fix any
  routes: Route[],
};
