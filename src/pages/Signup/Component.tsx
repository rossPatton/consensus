import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {EmailToken} from '~app/containers';

import {GroupSignup, UserSignup} from './_subpages';
import {tProps} from './_types';

export const SignupComponent = memo((props: tProps) => (
  <>
    <div className="bg-white rounded-tr rounded-bl rounded-br shadow m-auto contain-sm mb-3 p-2 d:p-3">
      <h1 className="mb-1">
        Create a new {props.sessionType} account
      </h1>
      <EmailToken
        actionLabel="Email Signup Token"
        renderOnSend={({email, sendToken}) => (
          <>
            {props.sessionType === 'user' && (
              <UserSignup
                email={email}
                history={props.history}
                sendToken={sendToken}
                termsAccepted={props.termsAccepted}
                toggleTerms={props.toggleTerms}
              />
            )}
            {props.sessionType === 'group' && (
              <GroupSignup
                email={email}
                location={props.location}
                sendToken={sendToken}
                termsAccepted={props.termsAccepted}
                toggleTerms={props.toggleTerms}
              />
            )}
          </>
        )}
      />
    </div>
    <div className="text-center contain m-auto">
      <Link
        to="/login"
        className="bg-white p-2 rounded font-bold p-2">
        Login to an existing account
      </Link>
    </div>
  </>
));
