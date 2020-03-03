import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { tProps } from './_types';

const EmailFormComponent = memo((props: tProps) => (
  <form
    className="contain mT4"
    name="emailVerificationTokenForm"
    action="/auth/v1/sendVerificationToken"
    onSubmit={props.sendVerificationToken}>
    <fieldset>
      <legend>
        <h1 className="fs2 mB2">Verify your Account</h1>
      </legend>
      <label htmlFor="emailInput">
        <input
          required
          autoComplete="email"
          name="email" // for non-js submit and passportjs
          id="emailInput"
          placeholder="Enter the email address for your account"
          className="p3 row mB2"
          value={props.email}
          onChange={ev => props.updateState('email', ev)}
          type="email"
        />
      </label>
      <div className="fx aiCtr">
        <button
          disabled={props.isClient && !props.email}
          className="p3 pL4 pR4 mR2">
          Send Verification Code
        </button>
        <Link
          to="/verify-account/enterCode"
          className="btn p3 pL4 pR4">
          Already have a code?
        </Link>
      </div>
    </fieldset>
  </form>
));

export default EmailFormComponent;
