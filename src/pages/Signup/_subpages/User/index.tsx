import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {login, postUser} from '~app/redux';

import {tContainerProps, tKeyUnion, tState} from './_types';
import {UserSignupComponent} from './Component';

export class UserSignupContainer extends PureComponent<tContainerProps, tState> {
  state = {
    error: '',
    username: '',
    token: '',
  };

  verifyAndRegister = async () => {
    const { token, username } = this.state;
    const { email } = this.props;

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
      await this.props.loginDispatch({
        email,
        sessionType: 'user',
        token,
      });
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
    return (
      <>
        <Helmet
          canonical="/signup/newUser"
          title="Start a new group on Consensus"
          meta={[
            { name: 'description', content: 'Fill our our signup form to start finding meetings in your neighborhood today!' },
            { name: 'keywords', content: 'user,signup' },
          ]}
        />
        <UserSignupComponent
          {...this.props}
          {...this.state}
          verifyAndRegister={this.verifyAndRegister}
          updateState={this.updateState}
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  loginDispatch: (query: ts.loginQuery) => dispatch(login(query)),
  postUserDispatch: (query: ts.userQuery) => dispatch(postUser(query)),
});

export const UserSignup = connect(null, mapDispatchToProps)(UserSignupContainer);
