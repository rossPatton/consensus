import {Helmet} from '@app/components';
import {ErrorBoundary, Template} from '@app/containers';
import _ from 'lodash';
import React, {memo} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {tProps, tStore} from './_types';
import {SignupComponent} from './Component';

const SignupContainer = memo((props: tProps) => (
  <Template>
    <ErrorBoundary status={_.get(props, 'session.error.status', 200)}>
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
      {props.session.isAuthenticated && <Redirect to="/admin/profile" />}
      {!props.session.isAuthenticated && (
        <SignupComponent
          location={props.location}
          match={props.match}
          session={props.session}
        />
      )}
    </ErrorBoundary>
  </Template>
));

const mapStateToProps = (store: tStore) => ({session: store.session.data});
const Signup = connect(mapStateToProps)(SignupContainer);
export default Signup;
