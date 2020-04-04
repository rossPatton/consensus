import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {OrgSignup, UserSignup} from './_subpages';
import {tProps} from './_types';

export const SignupComponent = memo((props: tProps) => (
  <>
    {!props.match.params.type && (
      <>
        <h1 className="mb-1">Create an account</h1>
        <h2 className="text-3 text-gray-4 mb-2">
          By signing up, you agree to our Terms and that you have read our Privacy Policy and Content Policy.
        </h2>
      </>
    )}
    {!props.match.params.type && (
      <div className="text-center">
        <div className="flex flex-col d:flex-row items-center justify-between mb-2">
          <div className="w-full mr-2">
            <Link className="bg-white block p-3 border rounded" to="/signup/newUser">
              New User
            </Link>
          </div>
          <div className=" w-full ml-1">
            <Link className="bg-white block p-3 border rounded" to="/signup/newOrg">
              New Organization
            </Link>
          </div>
        </div>
        <Link to="/login">
          Or login to an existing account
        </Link>
      </div>
    )}
    {props.match.params.type === 'newUser' && (
      <UserSignup />
    )}
    {props.match.params.type === 'newOrg' && (
      <OrgSignup location={props.location} />
    )}
  </>
));
