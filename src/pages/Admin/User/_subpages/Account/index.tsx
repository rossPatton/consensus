import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../../../../components';
import {ErrorBoundary, GenericLoader} from '../../../../../containers';
import {login, patchAccount} from '../../../../../redux';
import {tContainerProps, tKeyUnion, tState, tStore} from './_types';
import {AccountComponent} from './Component';

class AccountContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    this.state = {
      currentPassword: '',
      email: '',
      isLocked: true,
      isVerified: _.get(props, 'sessionThunk.data.isVerified', false),
      login: '',
      newPassword: '',
      privateEmail: _.get(props, 'sessionThunk.data.privateEmail', false),
    };
  }

  save = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {loginDispatch, patchAccountDispatch, sessionThunk} = this.props;
    const {isLocked, isVerified, ...patchAccountQuery} = this.state;

    try {
      await patchAccountDispatch(patchAccountQuery);
    } catch (err) {
      return loglevel.error(err);
    }

    try {
      const {login: currentLogin} = sessionThunk.data;
      const {login, newPassword, currentPassword} = this.state;
      await loginDispatch({
        username: login || currentLogin,
        password: newPassword || currentPassword,
      });
    } catch (err) {
      loglevel.error(err);
    }

    this.setState({
      currentPassword: '',
      email: '',
      isLocked: true,
      login: '',
      newPassword: '',
    });
  }

  toggleLock = () =>
    this.setState({
      isLocked: !this.state.isLocked,
    });

  updateState = (stateKey: tKeyUnion, value: string | boolean) => {
    if (!stateKey) return;
    this.setState({
      [stateKey]: value,
    } as Pick<tState, tKeyUnion>);
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
            <AccountComponent
              {...this.state}
              session={sessionThunk.data}
              save={this.save}
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
  patchAccountDispatch: (query: tAccountQuery) => dispatch(patchAccount(query)),
});

const Account = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountContainer);

export default Account;
