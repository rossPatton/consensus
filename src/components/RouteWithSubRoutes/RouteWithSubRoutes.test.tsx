import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import render from 'react-test-renderer';

import RouteWithSubRoutes from '.';
import {Avatar} from '..'

describe('RouteWithSubRoutes component', () => {
  it('renders null without crashing', () => {
    render.create((
      <Router>
        <RouteWithSubRoutes component={Avatar} path="/" />
      </Router>
    ));
  });
});
