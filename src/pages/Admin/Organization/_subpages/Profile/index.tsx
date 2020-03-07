import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../../../../components';
import {ErrorBoundary, GenericLoader} from '../../../../../containers';
import {login, patchOrg} from '../../../../../redux';
import {tContainerProps, tState, tStateUnion, tStore} from './_types';
import {ProfileComponent} from './Component';

class ProfileContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);
    const {created_at, updated_at, ...org}: tOrg =
      _.get(this.props, 'sessionThunk.data.profile', {});
    const email = _.get(props, 'sessionThunk.data.emails[0].email', '');

    this.state = {
      ...org,
      email,
      isLocked: true,
      password: '',
    };
  }

  onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {category, description, type, id} = this.state;

    let patchedOrg: tActionPayload<tOrg>;
    try {
      patchedOrg = await this.props.patchOrgDispatch({
        category,
        description,
        type,
        id,
      });
    } catch (err) {
      loglevel.error(err);
    }

    // TODO trigger error boundary or something
    if (!patchedOrg.payload) return;

    // update session by 'logging in' again, with the new account info
    try {
      await this.props.loginDispatch({
        username: this.props.sessionThunk.data.login,
        password: this.state.password,
      });
    } catch (err) {
      loglevel.error(err);
    }

    // reset password on submit
    this.setState({password: ''});
  }

  toggleLock = () =>
    this.setState({
      isLocked: !this.state.isLocked,
    });

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    if (!stateKey) return;

    let {value} = ev.currentTarget;
    if (stateKey === 'allowNonVerified') {
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
              onSubmit={this.onSubmit}
              session={sessionThunk.data}
              toggleLock={this.toggleLock}
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
  patchOrgDispatch: (query: tOrgQuery) => dispatch(patchOrg(query)),
});

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
export default Profile;
