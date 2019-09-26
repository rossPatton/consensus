import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {Helmet} from '../../../../components';
import {ErrorBoundary} from '../../../../containers';
import {tProps, tStore} from './_types';
import {AdminManageComponent} from './Component';

export class AdminManageContainer extends Component<tProps> {
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
            match={match}
            org={this.props.org}
            role={this.props.role}
            session={session}
          />
        )}
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  session: store.session.data,
});

export const AdminManage = connect(mapStateToProps)(AdminManageContainer);
