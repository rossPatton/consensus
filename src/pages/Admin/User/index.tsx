import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {Helmet} from '../../../components';
import {ErrorBoundary} from '../../../containers';
import {canonical, description, keywords, title} from './_constants';
import {tProps} from './_types';
import {UserAdminComponent} from './Component';

export class UserAdminContainer extends PureComponent<tProps> {
  render() {
    const {match, session} = this.props;

    return (
      <ErrorBoundary>
        <Helmet
          canonical={canonical}
          title={title}
          meta={[
            { name: 'description', content: description },
            { name: 'keywords', content: keywords },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
          ]}
        />
        {!session.isAuthenticated && <Redirect to="/login" />}
        {session.isAuthenticated && (
          <UserAdminComponent
            {...this.state}
            match={match}
            session={session}
          />
        )}
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: {session: tThunk<tSession>}) => ({
  session: store.session.data,
});

export const UserAdmin = connect(mapStateToProps)(UserAdminContainer);
