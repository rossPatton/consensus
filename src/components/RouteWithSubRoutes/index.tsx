import React from 'react';
import {Route, RouteComponentProps} from 'react-router-dom';

import {PrivateRoute} from '~app/components';

import {tProps} from './_types';

// for nested static routes
const RouteWithSubRoutes = (route: tProps) => (
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

export default RouteWithSubRoutes;
