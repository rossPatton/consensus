import cx from 'classnames';
import React, {memo, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {Helmet} from '~app/components';
import {ErrorBoundary, Template} from '~app/containers';

import {canonical, description, keywords, title} from './_constants';
import {tProps, tStore} from './_types';
import {SignupComponent} from './Component';

const SignupContainer = memo((props: tProps) => {
  const [sessionType, setType] = useState('user' as 'user' | 'group');

  return (
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
          <>
            <ul className="contain-sm flex m-auto">
              <li>
                <button
                  onClick={() => setType('user')}
                  className={cx({
                    'p-2 bg-white border-0 rounded-0 rounded-tl rounded-tr mr-1': true,
                    'bg-gray-3': sessionType === 'group',
                    'pointer-events-none': sessionType === 'user',
                  })}>
                  User
                </button>
              </li>
              <li>
                <button
                  onClick={() => setType('group')}
                  className={cx({
                    'p-2 bg-white border-0 rounded-0 rounded-tl rounded-tr': true,
                    'bg-gray-3': sessionType === 'user',
                    'pointer-events-none': sessionType === 'group',
                  })}>
                  Group
                </button>
              </li>
            </ul>
            <SignupComponent
              history={props.history}
              location={props.location}
              match={props.match}
              session={props.session}
              sessionType={sessionType}
            />
          </>
        )}
      </ErrorBoundary>
    </Template>
  );
});

const mapStateToProps = (store: tStore) => ({session: store.session.data});
const Signup = connect(mapStateToProps)(SignupContainer);
export default Signup;
