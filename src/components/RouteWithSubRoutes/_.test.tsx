import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import render from 'react-test-renderer';

import {Avatar} from '..';
import RouteWithSubRoutes from '.';

describe('RouteWithSubRoutes component', () => {
  it('renders null without crashing', () => {
    render.create((
      <Router>
        <RouteWithSubRoutes component={Avatar} path="/" />
      </Router>
    ));
  });
});
