import React, { PureComponent } from 'react';

import { PasswordInputComponent } from './Component';

export class PasswordInput extends PureComponent<any, any> {
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
