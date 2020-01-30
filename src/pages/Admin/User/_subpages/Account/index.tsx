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

    this.state = {
      isVerified: _.get(props, 'sessionThunk.data.isVerified', false),
      login: _.get(props, 'sessionThunk.data.login', ''),
      newPassword: '',
      password: '',
    };
  }

  save = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {loginDispatch, patchAccountDispatch, sessionThunk} = this.props;

    try {
      const id = _.get(sessionThunk, 'data.id', null);
      await patchAccountDispatch({...this.state, id});
    } catch (err) {
      return loglevel.error(err);
    }

    try {
      const {login, newPassword, password} = this.state;
      await loginDispatch({
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

  patchAccountDispatch: (query: {id: number} & tState) =>
    dispatch(patchAccount(query)),
});

const Account = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountContainer);

export default Account;
