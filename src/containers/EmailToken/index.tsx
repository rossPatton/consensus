import _ from 'lodash';
import React, {PureComponent} from 'react';

import {api} from '~app/utils';

import {tContainerProps, tKeyUnion, tState} from './_types';
import {EmailTokenComponent} from './Component';

export class EmailTokenContainer extends PureComponent<tContainerProps, tState> {
  static defaultProps = {
    actionLabel: 'Email token',
  };

  state = {
    email: '',
    error: '',
    emailSent: false,
  };

  sendToken = async () => {
    try {
      await api({
        path: '/email/v1/sendVerificationToken',
        query: {
          email: this.state.email,
        },
      });
    } catch (error) {
      return this.setState({
        error: error.message,
      });
    }

    this.setState({
      emailSent: true,
    });
  }

  updateState = (stateKey: tKeyUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tKeyUnion>);
  }

  render() {
    const {email, emailSent} = this.state;
    console.log('email token state => ', this.state);
    return (
      <>
        {!emailSent && (
          <EmailTokenComponent
            {...this.state}
            actionLabel={this.props.actionLabel}
            includeLegend={this.props.includeLegend}
            sendToken={this.sendToken}
            updateState={this.updateState}
          />
        )}
        {emailSent && this.props.renderOnSend(email)}
      </>
    );
  }
}

export default EmailTokenContainer;
