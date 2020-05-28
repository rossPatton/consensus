import React, { PureComponent } from 'react';

import {tProps, tState} from './_types';
import {PasswordInputComponent} from './Component';

class PasswordInput extends PureComponent<tProps, tState> {
  static defaultProps = {
    errors: {},
    name: 'password',
    password: '',
  };

  render() {
    return (
      <PasswordInputComponent
        {...this.props}
      />
    );
  }
}

export default PasswordInput;
