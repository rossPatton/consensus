import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {login, patchOrg} from '~app/redux';

import {tContainerProps, tKeyUnion, tState, tStore} from './_types';
import {ProfileComponent} from './Component';

class ProfileContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    const group = props?.sessionThunk?.data?.profile as ts.group;

    const {
      avatar,
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
