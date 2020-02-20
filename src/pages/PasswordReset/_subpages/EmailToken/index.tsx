import React, { memo } from 'react';

import { tComponentProps } from './_types';

const EmailTokenComponent = memo((props: tComponentProps) => (
  <form
    className="contain mT4"
    name="emailTokenForm"
    action="/auth/v1/passwordReset"
    onSubmit={props.sendPasswordResetEmail}>
    <fieldset>
      <legend>
        <h1 className="fs2 mB1">Password Reset</h1>
        <h2 className="fs4 mB3">If your account has an email associated with it, enter that here. You will receive an email with reset instructions.</h2>
      </legend>
      <label htmlFor="emailInput">
        <input
          required
          autoComplete="email"
          name="email" // for non-js submit and passportjs
          id="emailInput"
          placeholder="Enter the primary email tied to your account"
          className="p3 row mB3"
          value={props.email}
          onChange={ev => props.updateState('email', ev)}
          type="email"
        />
      </label>
      <button
        disabled={props.isClient && !props.email}
        className="p3 pL4 pR4 mR2">
        Send Reset Email
      </button>
    </fieldset>
  </form>
));

export default EmailTokenComponent;
