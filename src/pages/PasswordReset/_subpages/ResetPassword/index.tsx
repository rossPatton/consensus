import React, { memo } from 'react';
import {Link} from 'react-router-dom';

import { PasswordInput } from '../../../../components';
import { tProps } from './_types';

const ResetPasswordComponent = memo((props: tProps) => (
  <form
    className="contain mT4"
    name="passwordResetForm"
    action="/email/v1/resetPasswordByEmail"
    onSubmit={props.resetPasswordByEmail}>
    <fieldset>
      <legend>
        <h1 className="black fs2 mB2">Enter new password</h1>
        <h2 className="fs6 mB4 lh1">
          Enter the code sent to your email, along with your login credentials
        </h2>
      </legend>
      <label htmlFor="tokenInput">
        <h2 className="fs5 mB1 lh1">
          Token
        </h2>
        <input
          required
          autoComplete="off"
          name="token" // for non-js submit and passportjs
          id="tokenInput"
          placeholder="Enter the token you received via email"
          className="p3 row mB3"
          value={props.token}
          onChange={ev => props.updateState('token', ev)}
        />
      </label>
      <label htmlFor="usernameInput">
        <h2 className="fs5 mB1 lh1">
          Login
        </h2>
        <input
          required
          autoComplete="username"
          name="username" // for non-js submit and passportjs
          id="usernameInput"
          placeholder="Enter the secret login for your account"
          className="p3 row mB3"
          value={props.login}
          onChange={ev => props.updateState('login', ev)}
          type="username"
        />
      </label>
      <PasswordInput
        required
        newPassword
        id="pwInput"
        title="New password"
        password={props.password}
        placeholder="Example: correct_horse_battery_staple"
        onChange={ev => props.updateState('password', ev)}
      />
      <div className="fx aiCtr">
        <button
          disabled={props.isClient && (!props.login || !props.password)}
          className="p3 pL4 pR4 mR2">
          Reset Password
        </button>
        <Link
          to="/password-reset"
          className="btn p3 pL4 pR4">
          Didn&apos;t get a code?
        </Link>
      </div>
    </fieldset>
  </form>
));

export default ResetPasswordComponent;
