import React from 'react';
import render from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import ScrollToTop from '.';

describe('ScrollToTop component', () => {
  it('renders null without crashing', () => {
    render.create((
      <Router>
        <ScrollToTop path="/" />
      </Router>
    ));
  });
});
