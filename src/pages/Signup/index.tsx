import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {tProps, tStore} from './_types';
import {SignupComponent} from './Component';

export class SignupContainer extends PureComponent<tProps> {
  render() {
    const {session} = this.props;

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
        {session.isAuthenticated && <Redirect to="/admin/profile" />}
        {!session.isAuthenticated && (
          <SignupComponent
            location={this.props.location}
            match={this.props.match}
            session={session}
          />
        )}
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({session: store.session.data});
export const Signup = connect(mapStateToProps)(SignupContainer);
