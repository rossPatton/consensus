import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import { tProps} from './_types';
import { PrivateRoute } from '..';

// for nested static routes
export const RouteWithSubRoutes = (route: tProps) => (
  <Route
    path={route.path}
    render={(props: RouteComponentProps<any>) => {
      const { component: Component } = route;
      // pass the sub-routes down to keep nesting
      if (route.private) {
        return (
          <PrivateRoute
            {...props}
            {...route}
            routes={route.routes}
          />
        );
      }

      return (
        <Component
          {...props}
          routes={route.routes}
        />
      );
    }}
  />
);
