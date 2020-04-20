import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {ErrorBoundary, GenericLoader} from '~app/containers';
import {login, patchUser} from '~app/redux';

import {tContainerProps, tKeyUnion, tState, tStore} from './_types';
import {ProfileComponent} from './Component';

const initialState = {
  avatarEmail: '',
  bio: '',
  city: '',
  cityId: 0,
  email: '',
  name: '',
  password: '',
  privateMemberships: false,
  privateRSVP: false,
  region: '',
  regionId: 0,
  username: '',
};

class ProfileContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    const {avatarHash, created_at, updated_at, ...user}: tUser =
      _.get(props, 'sessionThunk.data.profile', null);

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
    const {sessionThunk} = this.props;
    const subsection: string = _.get(this.props, 'match.params.subsection', '');

    return (
      <ErrorBoundary status={_.get(sessionThunk, 'error.status', 200)}>
        <Helmet
          canonical=""
          title=""
          meta={[
            { name: 'description', content: '' },
            { name: 'keywords', content: '' },
            { property: 'og:title', content: '' },
            { property: 'og:description', content: '' },
          ]}
        />
        <GenericLoader
          isLoading={sessionThunk.isLoading}
          render={() => (
            <ProfileComponent
              {...this.state}
              save={this.save}
              session={sessionThunk.data}
              subsection={subsection}
              updateState={this.updateState}
            />
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  loginDispatch: (query: tLoginQuery) => dispatch(login(query)),
  patchUserDispatch: (user: Partial<tUser>) => dispatch(patchUser(user)),
});

const Profile = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileContainer);

export default Profile;
