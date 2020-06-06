import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {sendToken} from '~app/redux';

import {tContainerProps, tKeyUnion, tState, tStore} from './_types';
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
      await this.props.sendTokenDispatch({
        email: this.state.email,
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

const mapStateToProps = (store: tStore) => ({
  tokensThunk: store.tokens,
});

const mapDispatchToProps = (dispatch: Function) => ({
  sendTokenDispatch: (query: any) => dispatch(sendToken(query)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailTokenContainer);
