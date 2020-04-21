import React, { PureComponent } from 'react';

import {tProps, tState} from './_types';
import {PasswordInputComponent} from './Component';

class PasswordInput extends PureComponent<tProps, tState> {
  static defaultProps = {
    password: '',
  };

  state = {
    showPW: false,
  };

  togglePWVisibility = () =>
    this.setState({
      showPW: !this.state.showPW,
    });

  render() {
    return (
      <PasswordInputComponent
        {...this.props}
        {...this.state}
        togglePWVisibility={this.togglePWVisibility}
      />
    );
  }
}

export default PasswordInput;
