import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import render from 'react-test-renderer';

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
