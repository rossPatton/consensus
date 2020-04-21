import React from 'react';
import render from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import RouteWithSubRoutes from '.';

describe('RouteWithSubRoutes component', () => {
  it('renders null without crashing', () => {
    render.create((
      <Router>
        <RouteWithSubRoutes path="/" />
      </Router>
    ));
  });
});
