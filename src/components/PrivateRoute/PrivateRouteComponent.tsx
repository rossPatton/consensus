import React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

import { tProps } from './_types';

// for nested static routes
export const PrivateRouteComponent = (ownProps: tProps) => (
  <Route
    path={ownProps.path}
    render={(props: RouteComponentProps<any>) => {
      const { component: Component } = ownProps;

      if (ownProps.session.isAuthenticated) {
        return (
          <Component
            {...props}
            routes={ownProps.routes}
          />
        );
      }

      return (
        <Redirect to={ownProps.redirect || ''} />
      );
    }}
  />
);
