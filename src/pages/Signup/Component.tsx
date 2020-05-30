import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {GroupSignup, UserSignup} from './_subpages';
import {tProps} from './_types';

export const SignupComponent = memo((props: tProps) => (
  <>
    <div className="bg-white rounded shadow m-auto contain-sm mb-3 p-2 d:p-3">
      {!props.match.params.type && (
        <h1 className="mb-2 text-center">
          Create a new account
        </h1>
      )}
      {!props.match.params.type && (
        <div className="text-center">
          <Link
            className="inline-block hover:bg-gray-3 min-w-full d:min-w-0 d:mr-2 mb-1 d:mb-0 btn p-2 pl-3 pr-3"
            to="/signup/newUser">
            New User
          </Link>
          <Link
            className="inline-block hover:bg-gray-3 min-w-full d:min-w-0 btn p-2 pl-3 pr-3"
            to="/signup/newGroup">
            New Group
          </Link>
        </div>
      )}
      {props.match.params.type === 'newUser' && (
        <UserSignup />
      )}
      {props.match.params.type === 'newGroup' && (
        <GroupSignup location={props.location} />
      )}
    </div>
    <div className="text-center contain m-auto">
      <Link
        to="/login"
        className="bg-white p-2 rounded font-bold p-2">
        Or login to an existing account
      </Link>
    </div>
  </>
));
