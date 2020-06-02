import React, {memo} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {Helmet} from '~app/components';
import {ErrorBoundary, Template} from '~app/containers';

import {canonical, description, keywords, title} from './_constants';
import {tProps, tStore} from './_types';
import {SignupComponent} from './Component';

const SignupContainer = memo((props: tProps) => (
  <Template className="bg-community m-auto min-h-halfscreen pb-5 pt-4">
    <Helmet
      canonical={canonical}
      title={title}
      meta={[
        { name: 'description', content: description },
        { name: 'keywords', content: keywords },
      ]}
    />
    <ErrorBoundary status={props?.session?.error?.status}>
      {props.session.isAuthenticated && <Redirect to="/admin/profile" />}
      {!props.session.isAuthenticated && (
        <SignupComponent
          history={props.history}
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
