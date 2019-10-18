import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {authenticateSession, updateUser} from '../../../../../redux';
import {tContainerProps, tState, tStateUnion} from './_types';
import {ProfileComponent} from './Component';

const initialState = {
  bio: '',
  email: '',
  name: '',
  newPassword: '',
  password: '',
  privateEmail: true,
  privateMemberships: false,
  privateRSVP: false,
  username: '',
};

class ProfileContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    const user = props.session.profile as tUser;

    this.state = {
      ...initialState,
      bio: user.bio,
      email: user.email,
      name: user.name,
      newPassword: '',
      password: '',
      privateEmail: user.privateEmail,
      privateMemberships: user.privateMemberships,
      privateRSVP: user.privateRSVP,
      username: user.username,
    };
  }

  // componentDidMount() {
  //   // we do this so we only disable form submit when js is available
  //   this.setState({
  //     isClient: true,
  //   });
  // }

  save = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {login, profile} = this.props.session;
    const {newPassword, password} = this.state;

    let newUser;
    try {
      newUser = await this.props.updateUser({id: profile.id, ...this.state});
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

    this.setState({password: ''});
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    let {value} = ev.currentTarget;
    if (stateKey.indexOf('private') !== -1) {
      value = !this.state[stateKey];
    }

    this.setState({
      [stateKey]: value,
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
  authenticateSession: (login: tLogin) => dispatch(authenticateSession(login)),
  updateUser: (user: {id: number} & tState) => dispatch(updateUser(user)),
});

const Profile = connect(
  null,
  mapDispatchToProps
)(ProfileContainer);

export default Profile;
