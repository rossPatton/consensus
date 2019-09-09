import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import {Helmet} from '../../../../components';
import {ErrorBoundary} from '../../../../containers';
import {tContainerProps, tStateUnion, tStore} from './_types';
import {AdminManageComponent} from './Component';

export class AdminManageContainer extends Component<tContainerProps, tOrg> {
  state = {
    ...this.props.org,
    newPassword: '',
    password: '',
  };

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tOrg, tStateUnion>);
  }

  render() {
    const {match, session} = this.props;

    return (
      <ErrorBoundary>
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
        {!session.isAuthenticated && <Redirect to="" />}
        {session.isAuthenticated && (
          <AdminManageComponent
            {...this.state}
            onSubmit={this.onSubmit}
            org={this.props.org}
            match={match}
            session={session}
            updateState={this.updateState}
          />
        )}
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  session: store.session.data,
});

// const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
//   updateOrg: (event: any) => dispatch(updateOrg(event)),
// });

export const AdminManage = connect(
  mapStateToProps,
  // mapDispatchToProps
)(AdminManageContainer);