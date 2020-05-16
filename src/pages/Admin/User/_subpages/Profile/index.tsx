import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {v4} from 'uuid';

import {login, patchUser} from '~app/redux';

import {initialState} from './_constants';
import {tContainerProps, tKeyUnion, tState, tStore} from './_types';
import {ProfileComponent} from './Component';

let uniqueHash = v4();

class ProfileContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    uniqueHash = v4();

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

  removeAvatar = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    this.setState({
      userAvatar: null,
    });
  }

  setAvatar = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const user = this.props.sessionThunk?.data.profile;
    let userAvatar = `u${user.id}:uAv:${uniqueHash}`;
    let ext = 'jpg';

    const body = new FormData();
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    if (fileInput !== null) {
      const { files }: { files: FileList | null } = fileInput;
      if (files !== null) {
        const regexExt = /[^\\]*\.(\w+)$/;
        ext = files[0].name.match(regexExt)[1];
        userAvatar = `${userAvatar}.${ext}`;
        body.append('userAvatar', files[0], userAvatar);
      }
    }

    // upload image to fileserver, resize, etc if we have one
    // TODO this should go through redux probably
    try {
      await fetch('/api/v1/spaces', {method: 'post', body});
      setTimeout(() =>
        this.setState({
          userAvatar,
        }), 1000);
    } catch (err) {
      loglevel.error('failed to upload featured image');
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
        removeAvatar={this.removeAvatar}
        setAvatar={this.setAvatar}
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
