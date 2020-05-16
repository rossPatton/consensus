import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {v4} from 'uuid';

import {login, patchOrg} from '~app/redux';
import {tContainerProps, tKeyUnion, tState, tStore} from './_types';
import {ProfileComponent} from './Component';

let uniqueHash = v4();

class ProfileContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    uniqueHash = v4();
    const group = props?.sessionThunk?.data?.profile as ts.group;

    const {
      avatarHash,
      city,
      cityId,
      country,
      countryId,
      created_at,
      name,
      region,
      regionId,
      updated_at,
      ...editablePartOfGroup
    } = group;

    this.state = {
      ...editablePartOfGroup,
      avatarEmail: '',
      // @ts-ignore
      groupAvatar: null,
      password: '',
    };
  }

  onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      await this.props.patchOrgDispatch(this.state);
    } catch (err) {
      loglevel.error(err);
    }

    // update session by 'logging in' again, with the new account info
    try {
      await this.props.loginDispatch({
        username: this.props.sessionThunk.data.login,
        password: this.state.password,
      });
    } catch (err) {
      loglevel.error(err);
    }

    // reset on submit
    this.setState({password: ''});
  }

  removeAvatar = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    this.setState({
      groupAvatar: null,
    });
  }

  setAvatar = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const group = this.props.sessionThunk?.data.profile;

    const regexExt = /[^\\]*\.(\w+)$/;
    let groupAvatar = `g${group.id}:gAv:${uniqueHash}`;
    let ext = 'jpg';

    const body = new FormData();
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    if (fileInput !== null) {
      const { files }: { files: FileList | null } = fileInput;
      if (files !== null) {
        ext = files[0].name.match(regexExt)[1];
        groupAvatar = `${groupAvatar}.${ext}`;
        body.append('groupAvatar', files[0], groupAvatar);
      }
    }

    // upload image to fileserver, resize, etc if we have one
    // TODO this should go through redux probably
    try {
      await fetch('/api/v1/spaces', {method: 'post', body});
      setTimeout(() =>
        this.setState({
          groupAvatar,
        }), 1000);
    } catch (err) {
      loglevel.error('failed to upload featured image');
    }
  }

  updateState = (stateKey: tKeyUnion, ev: React.ChangeEvent<any>) => {
    if (!stateKey) return;

    let {value} = ev.currentTarget;
    if (stateKey === 'allowNonVerified') {
      value = !this.state[stateKey];
    }

    this.setState({
      [stateKey]: value,
    } as Pick<tState, tKeyUnion>);
  }

  render() {
    const {match, sessionThunk} = this.props;
    const {subsection} = match?.params;

    return (
      <ProfileComponent
        {...this.props}
        {...this.state}
        onSubmit={this.onSubmit}
        removeAvatar={this.removeAvatar}
        setAvatar={this.setAvatar}
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
  patchOrgDispatch: (query: ts.groupQuery) => dispatch(patchOrg(query)),
});

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
export default Profile;
