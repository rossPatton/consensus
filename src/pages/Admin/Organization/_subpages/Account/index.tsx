import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {GenericLoader, Helmet} from '../../../../../components';
import {ErrorBoundary} from '../../../../../containers';
import {login, patchAccount} from '../../../../../redux';
import {tContainerProps, tState, tStateUnion, tStore} from './_types';
import {AccountComponent} from './Component';

class AccountContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    const session = _.get(props, 'sessionThunk.data', {});

    this.state = {
      isVerified: session.isVerified,
      login: session.login,
      newPassword: '',
      password: '',
    };
  }

  save = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const accountId = _.get(this.props, 'sessionThunk.data.id', null);

    if (!accountId) return;

    let newAccount: tActionPayload<tAccount>;
    try {
      newAccount = await this.props.patchAccountDispatch({
        ...this.state,
        id: accountId,
      });
    } catch (err) {
      return loglevel.error(err);
    }

    // TODO trigger error boundary or something
    if (!newAccount.payload) return;

    // update session by 'logging in' again, with the new account info
    const {login, newPassword, password} = this.state;
    try {
      await this.props.loginDispatch({
        username: login,
        password: newPassword || password,
      });
    } catch (err) {
      loglevel.error(err);
    }

    this.setState({password: ''});
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
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
            <AccountComponent
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
  patchAccountDispatch: (query: tAccount) => dispatch(patchAccount(query)),
});

const Account = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountContainer);

export default Account;
