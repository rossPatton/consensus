import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { tProps } from './_types';

const EmailFormComponent = memo((props: tProps) => (
  <form
    name="emailVerificationTokenForm"
    action="/auth/v1/sendVerificationToken"
    onSubmit={props.sendVerificationToken}>
    <fieldset>
      <legend>
        <h1 className="mb-2">Verify your Email</h1>
      </legend>
      <label htmlFor="emailInput">
        <input
          required
          autoComplete="email"
          name="email" // for non-js submit and passportjs
          id="emailInput"
          placeholder="Enter the email address for your account"
          className="p-2 w-full mb-2"
          value={props.email}
          onChange={ev => props.updateState('email', ev)}
          type="email"
        />
      </label>
      <div className="flex flex-col d:flex-row">
        <button
          disabled={props.hasMounted && !props.email}
          className="p-2 pl-3 pr-3 d:mr-2 mb-1 d:mb-0 hover:bg-gray-2">
          Send Verification Code
        </button>
        <Link
          to="/verify-email/enterCode"
          className="btn p-2 pl-3 pr-3 hover:bg-gray-2">
          Already have a code?
        </Link>
      </div>
    </fieldset>
  </form>
));

export default EmailFormComponent;