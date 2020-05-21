import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {GroupSignup, UserSignup} from './_subpages';
import {tProps} from './_types';

export const SignupComponent = memo((props: tProps) => (
  <>
    {!props.match.params.type && (
      <h1 className="mb-1">
        Create a new account
      </h1>
    )}
    {!props.match.params.type && (
      <>
        <div className="mb-3">
          <Link
            className="hover:bg-gray-3 min-w-full d:min-w-0 d:mr-2 mb-1 d:mb-0 btn p-2 pl-3 pr-3"
            to="/signup/newUser">
            New User
          </Link>
          <Link
            className="hover:bg-gray-3 min-w-full d:min-w-0 btn p-2 pl-3 pr-3"
            to="/signup/newGroup">
            New Group
          </Link>
        </div>
        <Link
          to="/login"
          className="font-bold text-center d:text-left">
          Or login to an existing account
        </Link>
      </>
    )}
    {props.match.params.type === 'newUser' && (
      <UserSignup />
    )}
    {props.match.params.type === 'newGroup' && (
      <GroupSignup location={props.location} />
    )}
  </>
));
