import React from 'react';
import render from 'react-test-renderer';

import PasswordInput from '.';

describe('PasswordInput component', () => {
  it('renders without crashing', () => {
    render.create((
      <PasswordInput
        id="test"
        onChange={() => {}}
      />
    ));
  });
});
