import cx from 'classnames';
import React, {memo, useState} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import {Helmet} from '~app/components';
import {ErrorBoundary, Template} from '~app/containers';

import {canonical, description, keywords, title} from './_constants';
import {tContainerProps, tStore} from './_types';
import {SignupComponent} from './Component';

const SignupContainer = memo((props: tContainerProps) => {
  const [termsAccepted, toggleTerms] = useState(false);
  const { match, sessionThunk } = props;
  const { type = 'user' } = match.params;

  return (
    <Template className="bg-community m-auto min-h-halfscreen pb-5 pt-4">
      <Helmet
        canonical={`${canonical}/${type}`}
        title={title}
        meta={[
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
        ]}
      />
      <ErrorBoundary status={sessionThunk.error?.status}>
        {sessionThunk.data.isAuthenticated && <Redirect to="/admin/profile" />}
        {!sessionThunk.data.isAuthenticated && (
          <>
            <ul className="contain-sm flex m-auto">
              <li>
                <Link
                  to="/signup/user"
                  className={cx({
                    'block p-1 pl-2 pr-2 rounded-tl rounded-tr mr-1': true,
                    'bg-gray-3': type === 'group',
                    'bg-white pointer-events-none': type === 'user',
                  })}>
                  User
                </Link>
              </li>
              <li>
                <Link
                  to="/signup/group"
                  className={cx({
                    'block p-1 pl-2 pr-2 rounded-tl rounded-tr': true,
                    'bg-gray-3': type === 'user',
                    'bg-white pointer-events-none': type === 'group',
                  })}>
                  Group
                </Link>
              </li>
            </ul>
            <SignupComponent
              history={props.history}
              location={props.location}
              match={props.match}
              sessionType={type}
              termsAccepted={termsAccepted}
              toggleTerms={toggleTerms}
            />
          </>
        )}
      </ErrorBoundary>
    </Template>
  );
});

const mapStateToProps = (store: tStore) => ({
  sessionThunk: store.session,
});

const Signup = connect(mapStateToProps)(SignupContainer);
export default Signup;
