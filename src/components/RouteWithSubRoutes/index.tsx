import React from 'react';
import {Route, RouteComponentProps} from 'react-router-dom';

import {PrivateRoute} from '~app/components';

import {tProps} from './_types';

// for nested static routes
const RouteWithSubRoutes = (props: tProps) => (
  <Route
    path={props.path}
    render={(route: RouteComponentProps<any>) => {
      console.log('route props => ', props);
      console.log('component => ', props.component);
      const { component: Component } = props;

      // pass the sub-routes down to keep nesting
      if (props.private) {
        return (
          <PrivateRoute
            {...route}
            {...props}
            routes={props.routes}
          />
        );
      }

      return (
        <Component
          {...route}
          routes={props.routes}
        />
      );
    }}
  />
);

export default RouteWithSubRoutes;
