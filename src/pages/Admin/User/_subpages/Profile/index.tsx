import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {patchSessionSuccess, patchUser} from '~app/redux';

import {initialState} from './_constants';
import {tContainerProps, tKeyUnion, tState, tStore} from './_types';
import {ProfileComponent} from './Component';

class ProfileContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    const {
      created_at,
      updated_at,
      ...user
    } = props?.sessionThunk?.data?.profile;

    if (user) {
      this.state = {
        ...initialState,
        ...user,
        bio: user.bio === 'null' ? '' : user.bio,
        name: user.name === 'null' ? '' : user.name,
      };
    } else {
      this.state = initialState;
    }
  }

  save = async () => {
    const {avatar, dispatch, patchUserDispatch, sessionThunk} = this.props;
    const {isAuthenticated, profile, qr, type} = sessionThunk.data;
    const {error, ...stateToUse} = this.state;

    let avatarToUse = avatar;
    if (!avatarToUse) {
      avatarToUse = profile.avatar;
    }

    if (profile.id) {
      try {
        const user = await patchUserDispatch({
          ...stateToUse,
          avatar: avatarToUse,
          bio: encodeURIComponent(this.state.bio),
        });

        dispatch(patchSessionSuccess({
          isAuthenticated,
          profile: user.payload,
          qr,
          type,
        }));

        return this.props.history.push('/admin/profile');
      } catch (err) {
        return loglevel.error(err);
      }
    }

    // window.location.reload();
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
        avatar={this.props.avatar}
        save={this.save}
        session={sessionThunk.data}
        subsection={subsection}
        updateState={this.updateState}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => {
  const avatar = store.uploads?.data?.userAvatar || '';
  return {
    avatar,
    sessionThunk: store.session,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  dispatch,
  patchUserDispatch: (user: Partial<ts.user>) => dispatch(patchUser(user)),
});

const Profile = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileContainer);

export default Profile;
