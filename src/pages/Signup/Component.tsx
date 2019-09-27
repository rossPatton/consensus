import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {OrgSignup, UserSignup} from './_subpages';
import {tProps} from './_types';

export const SignupComponent = memo((props: tProps) => (
  <div className="contain mT4">
    <h1 className="fs2 taCtr">Create an account</h1>
    <div className="fs6 taCtr mB3">
      By signing up, you agree to our Terms and that you have read our Privacy Policy and Content Policy.
    </div>
    {!props.match.params.type && (
      <div className="fx aiCtr jcBetween">
        <div className="col row mR2">
          <Link className="dBl p4 brdA1 br8 taCtr hvrBgGrey1 trans1" to="/signup/newUser">
            New User
          </Link>
        </div>
        <div className="col row mL2">
          <Link className="dBl p4 brdA1 br8 taCtr hvrBgGrey1 trans1" to="/signup/newOrg">
            New Organization
          </Link>
        </div>
      </div>
    )}
    {props.match.params.type === 'newUser' && (
      <UserSignup />
    )}
    {props.match.params.type === 'newOrg' && (
      <OrgSignup />
    )}
  </div>
));
