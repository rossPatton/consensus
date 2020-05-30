import React, { memo } from 'react';
import {Link} from 'react-router-dom';

import { tComponentProps } from '../../_types';

const EmailTokenComponent = memo((props: tComponentProps) => (
  <form
    name="emailTokenForm"
    onSubmit={props.sendLoginResetEmail}>
    <fieldset>
      <legend>
        <h1 className="mb-2">Login Reset</h1>
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
      <div className="flex flex-col d:flex-row items-center">
        <button
          disabled={props.hasMounted && !props.email}
          className="hover:bg-gray-1 p-2 pl-3 pr-3 mr-2">
          Send Reset Code
        </button>
        <Link
          to="/login-reset/enterCode"
          className="hover:bg-gray-1 btn p-2 pl-3 pr-3">
          Already have a code?
        </Link>
      </div>
    </fieldset>
  </form>
));

export default EmailTokenComponent;
