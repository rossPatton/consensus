import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {login, patchUser} from '~app/redux';

import {initialState} from './_constants';
import {tContainerProps, tKeyUnion, tState, tStore} from './_types';
import {ProfileComponent} from './Component';

class ProfileContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    const {
      avatarHash,
      created_at,
      updated_at,
      ...user
    } = props?.sessionThunk?.data?.profile;

    if (user) {
      this.state = {
        ...initialState,
        ...user,
      };
    } else {
      this.state = initialState;
    }
  }

  save = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {loginDispatch, patchUserDispatch, sessionThunk} = this.props;
    const {login, profile} = sessionThunk.data;

    if (profile.id) {
      try {
        await patchUserDispatch({
          ...this.state,
          id: profile.id,
        });
      } catch (err) {
        return loglevel.error(err);
      }
    }

    // update current session to reflect new settings
    try {
      await loginDispatch({
        username: login,
        password: this.state.password,
      });
    } catch (err) {
      loglevel.error(err);
    }

    this.props.history.push('/admin/profile');
  }

  updateState = (key: tKeyUnion, value: string | number | object | boolean) => {
    // if making multiple changes at once, don't update at end
    if (typeof value === 'object') {
      return this.setState(value);
    }

    let newValue = value;
    if (key.indexOf('private') !== -1) {
      newValue = !this.state[key];
    }

    // @ts-ignore
    this.setState({
      [key]: newValue,
    } as Pick<tState, tKeyUnion>);
  }

  render() {
    const {match, sessionThunk} = this.props;
    const {subsection} = match?.params;

    return (
      <ProfileComponent
        {...this.state}
        save={this.save}
        session={sessionThunk.data}
        subsection={subsection}
        updateState={this.updateState}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  loginDispatch: (query: ts.loginQuery) => dispatch(login(query)),
  patchUserDispatch: (user: Partial<ts.user>) => dispatch(patchUser(user)),
});

const Profile = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileContainer);

export default Profile;
