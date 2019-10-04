import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {authenticateSession, updateUser} from '../../../../../redux';
import {tContainerProps, tState, tStateUnion} from './_types';
import {AccountComponent} from './Component';

const initialState = {
  isClient: false,
  login: '',
  newPassword: '',
  password: '',
  privateRSVP: false,
  privateMembership: false,
  privateProfile: false,
};

export class AccountContainer extends PureComponent<tContainerProps, tState> {
  state = initialState;

  componentDidMount() {
    // we do this so we only disable form submit when js is available
    this.setState({
      isClient: true,
    });
  }

  save = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {id, login} = this.props.session;
    const {newPassword, password} = this.state;

    let newUser;
    try {
      newUser = await this.props.updateUser({id, ...this.state});
    } catch (err) {
      return console.error(err);
    }

    // TODO trigger error boundary or something
    if (!newUser.payload) return;

    try {
      await this.props.authenticateSession({
        username: login,
        password: newPassword || password,
      });
    } catch (err) {
      console.error(err);
    }

    this.setState(initialState);
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    return (
      <AccountComponent
        {...this.state}
        session={this.props.session}
        save={this.save}
        updateState={this.updateState}
      />
    );
  }
}

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  authenticateSession: (login: tLogin) => dispatch(authenticateSession(login)),
  updateUser: (account: {id: number} & tState) => dispatch(updateUser(account)),
});

export const Account = connect(
  null,
  mapDispatchToProps
)(AccountContainer);
