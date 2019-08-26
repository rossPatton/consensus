import React, { PureComponent } from 'react';

import {tProps, tState} from './_types';
import {PasswordInputComponent} from './Component';

export class PasswordInput extends PureComponent<tProps, tState> {
  state = {
    showPW: false,
  };

  togglePWVisibility = () => {
    this.setState({
      showPW: !this.state.showPW,
    });
  }

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
