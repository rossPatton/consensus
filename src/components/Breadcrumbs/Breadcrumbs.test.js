import React from 'react';
import TestRenderer from 'react-test-renderer';

import Breadcrumbs from '.';

it('renders without crashing', () => {
  TestRenderer.create(<Breadcrumbs />);
});
