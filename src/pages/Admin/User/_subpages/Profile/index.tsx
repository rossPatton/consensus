import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {GenericLoader, Helmet} from '../../../../../components';
import {ErrorBoundary} from '../../../../../containers';
import {login, patchUser} from '../../../../../redux';
import {tContainerProps, tState, tStateUnion, tStore} from './_types';
import {ProfileComponent} from './Component';

const initialState = {
  bio: '',
  email: '',
  name: '',
  password: '',
  privateEmail: true,
  privateLocation: true,
  privateMemberships: false,
  privatePhone: true,
  privateRSVP: false,
  username: '',
};

class ProfileContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    const {created_at, updated_at, ...user}: tUser =
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
    const {sessionThunk} = this.props;

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
              session={sessionThunk.data}
              save={this.save}
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
