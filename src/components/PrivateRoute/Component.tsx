import React from 'react';
import { Navigate, Route, RouteComponentProps } from 'react-router-dom';

import { tProps } from './_types';

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
        <Navigate to={ownProps.redirect || '/login'} />
      );
    }}
  />
);
