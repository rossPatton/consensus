import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {OrgSignup, UserSignup} from './_subpages';
import {tProps} from './_types';

export const SignupComponent = memo((props: tProps) => (
  <div className="contain mt-4">
    {!props.match.params.type && (
      <>
        <h1 className="fs2 mb-1">Create an account</h1>
        <h2 className="text-sm mb-3">
          By signing up, you agree to our Terms and that you have read our Privacy Policy and Content Policy.
        </h2>
      </>
    )}
    {!props.match.params.type && (
      <div className="text-center">
        <div className="flex flex-col d:flex-row items-center jcBetween mb-3">
          <div className=" w-full mr-2">
            <Link className="bg-white dBl p4 brdA1 br8" to="/signup/newUser">
              New User
            </Link>
          </div>
          <div className=" w-full mL2">
            <Link className="bg-white dBl p4 brdA1 br8" to="/signup/newOrg">
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
  </div>
));
