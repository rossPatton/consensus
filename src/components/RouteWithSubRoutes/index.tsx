import React from 'react';
import { Route } from 'react-router-dom';

import { PrivateRoute } from '~app/components';

import { tProps } from './_types';

// for nested static routes
const RouteWithSubRoutes = (props: tProps) => {
  console.log("🚀 ~ RouteWithSubRoutes ~ props:", props)
  return (
    <Route
      path={props.path as string}
    // element={(route) => {
    //   const { component: Component } = props;

    //   // pass the sub-routes down to keep nesting
    //   // if (props.private) {
    //   //   return (
    //   //     <PrivateRoute
    //   //       {...route}
    //   //       {...props}
    //   //       routes={props.routes}
    //   //     />
    //   //   );
    //   // }

    //   return (
    //     <Component
    //       {...route}
    //       routes={props.routes}
    //     />
    //   );
    // }}
    />
  );
};

export default RouteWithSubRoutes;
