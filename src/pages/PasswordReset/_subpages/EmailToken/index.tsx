import React, { memo } from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

const EmailTokenComponent = memo((props: tProps) => (
  <form
    className="contain mt-4"
    name="emailTokenForm"
    action="/email/v1/emailResetToken"
    onSubmit={props.sendPasswordResetEmail}>
    <fieldset>
      <legend>
        <h1 className="fs2 mb-2">Password Reset</h1>
      </legend>
      <label htmlFor="emailInput">
        <input
          required
          autoComplete="email"
          name="email" // for non-js submit and passportjs
          id="emailInput"
          placeholder="Enter the email address for your account"
          className="p-3 w-full mb-3"
          value={props.email}
          onChange={ev => props.updateState('email', ev)}
          type="email"
        />
      </label>
      <div className="flex flex-col d:flex-row items-center">
        <button
          disabled={props.isClient && !props.email}
          className="p-3 pl-4 pR4 mr-2">
          Send Reset Code
        </button>
        <Link
          to="/password-reset/enterCode"
          className="btn p-3 pl-4 pR4">
          Already have a code?
        </Link>
      </div>
    </fieldset>
  </form>
));

export default EmailTokenComponent;
