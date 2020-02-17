import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {OrgSignup, UserSignup} from './_subpages';
import {tProps} from './_types';

export const SignupComponent = memo((props: tProps) => (
  <div className="contain mT4 taCtr">
    <h1 className="fs2 mB1">Create an account</h1>
    <h2 className="fs6 mB3">
      By signing up, you agree to our Terms and that you have read our Privacy Policy and Content Policy.
    </h2>
    {!props.match.params.type && (
      <div className="taCtr">
        <div className="fx aiCtr jcBetween mB3">
          <div className="col row mR2">
            <Link className="bgWhite dBl p4 brdA1 br8" to="/signup/newUser">
              New User
            </Link>
          </div>
          <div className="col row mL2">
            <Link className="bgWhite dBl p4 brdA1 br8" to="/signup/newOrg">
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
