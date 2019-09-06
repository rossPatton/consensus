import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {authenticateSession, updateUser} from '../../../../../redux';
import {UPDATE_USER_SUCCESS} from '../../../../../redux/async/updateUser/_types';
import {tContainerProps, tState, tStateUnion} from './_types';
import {ProfileComponent} from './Component';

const initialState = {
  isClient: false,
  email: '',
  password: '',
  newPassword: '',
  username: '',
  fname: '',
  lname: '',
};

export class ProfileContainer extends PureComponent<tContainerProps, tState> {
  state = initialState;

  componentDidMount() {
    // we do this so we only disable form submit when js is available
    this.setState({
      isClient: true,
    });
  }

  save = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {id} = this.props.session;
    const {newPassword, password} = this.state;

    let newUser: tAction<typeof UPDATE_USER_SUCCESS, tUser>;
    try {
      newUser = await this.props.updateUser({id, ...this.state});
    } catch (err) {
      return console.error(err);
    }

    // TODO trigger error boundary or something
    if (!newUser.payload) return;

    try {
      await this.props.authenticateSession({
        username: newUser.payload.username,
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
      <ProfileComponent
        {...this.state}
        session={this.props.session}
        save={this.save}
        updateState={this.updateState}
      />
    );
  }
}

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  authenticateSession: (user: tSession) => dispatch(authenticateSession(user)),
  updateUser: (user: tSession) => dispatch(updateUser(user)),
});

export const Profile = connect(
  null,
  mapDispatchToProps
)(ProfileContainer);
