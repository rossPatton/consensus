import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {GroupSignup, UserSignup} from './_subpages';
import {tProps} from './_types';

export const SignupComponent = memo((props: tProps) => (
  <>
    {!props.match.params.type && (
      <>
        <h1>Create an account</h1>
        <h2 className="text-gray-5 mb-2">
          By signing up, you agree to our Terms and that you have read our Privacy Policy and Content Policy.
        </h2>
      </>
    )}
    {!props.match.params.type && (
      <>
        <div className="mb-2">
          <Link
            className="hover:bg-gray-3 min-w-full d:min-w-0 d:mr-2 mb-1 d:mb-0 btn p-2 pl-3 pr-3"
            to="/signup/newUser">
            New User
          </Link>
          <Link
            className="hover:bg-gray-3 min-w-full d:min-w-0 btn p-2 pl-3 pr-3"
            to="/signup/newOrg">
            New Group
          </Link>
        </div>
        <Link
          className="block text-center d:text-left"
          to="/login">
          ...or do you want login to an existing account?
        </Link>
      </>
    )}
    {props.match.params.type === 'newUser' && (
      <UserSignup />
    )}
    {props.match.params.type === 'newOrg' && (
      <GroupSignup location={props.location} />
    )}
  </>
));
