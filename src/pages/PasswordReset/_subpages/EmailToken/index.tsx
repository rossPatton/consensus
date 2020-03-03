import React, { memo } from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

const EmailTokenComponent = memo((props: tProps) => (
  <form
    className="contain mT4"
    name="emailTokenForm"
    action="/email/v1/emailResetToken"
    onSubmit={props.sendPasswordResetEmail}>
    <fieldset>
      <legend>
        <h1 className="fs2 mB2">Password Reset</h1>
      </legend>
      <label htmlFor="emailInput">
        <input
          required
          autoComplete="email"
          name="email" // for non-js submit and passportjs
          id="emailInput"
          placeholder="Enter the email address for your account"
          className="p3 row mB3"
          value={props.email}
          onChange={ev => props.updateState('email', ev)}
          type="email"
        />
      </label>
      <div className="fx aiCtr">
        <button
          disabled={props.isClient && !props.email}
          className="p3 pL4 pR4 mR2">
          Send Reset Code
        </button>
        <Link
          to="/password-reset/enterCode"
          className="btn p3 pL4 pR4">
          Already have a code?
        </Link>
      </div>
    </fieldset>
  </form>
));

export default EmailTokenComponent;
