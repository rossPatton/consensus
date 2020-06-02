import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {login, postAccount, postUser} from '~app/redux';
import {api} from '~app/utils';

import {EmailTokenComponent} from './_components/EmailToken';
import {UserSignupComponent} from './_components/UserSignup';
import {tContainerProps, tKeyUnion, tPostUserQuery, tState} from './_types';

export class UserSignupContainer extends PureComponent<tContainerProps, tState> {
  state = {
    email: '',
    emailSent: false,
    error: '',
    username: '',
    token: '',
  };

  sendToken = async () => {
    try {
      await api({
        path: '/email/v1/sendVerificationToken',
        query: {
          email: this.state.email,
          type: 'user',
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

  verifyAndRegister = async () => {
    const { email, token, username } = this.state;

    // add user to db
    try {
      await this.props.postUserDispatch({ email, username });
    } catch (error) {
      return this.setState({
        error: error.message,
      });
    }

    // and log them in on success
    try {
      await this.props.loginDispatch({ email, token });
    } catch (error) {
      this.setState({
        error: error.message,
      });
    }

    this.props.history.push('/admin/meetings');
  }

  updateState = (stateKey: tKeyUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tKeyUnion>);
  }

  render() {
    const {emailSent} = this.state;
    return (
      <>
        {!emailSent && (
          <EmailTokenComponent
            {...this.state}
            sendToken={this.sendToken}
            updateState={this.updateState}
          />
        )}
        {emailSent && (
          <UserSignupComponent
            {...this.state}
            verifyAndRegister={this.verifyAndRegister}
            updateState={this.updateState}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (store: any) => ({
  account: store.account,
});

const mapDispatchToProps = (dispatch: Function) => ({
  loginDispatch: (query: ts.loginQuery) => dispatch(login(query)),
  postAccountDispatch: (query: {email: string}) => dispatch(postAccount(query)),
  postUserDispatch: (query: tPostUserQuery) => dispatch(postUser(query)),
});

export const UserSignup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserSignupContainer);
