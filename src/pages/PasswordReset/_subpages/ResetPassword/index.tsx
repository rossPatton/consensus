import React, { memo } from 'react';

import { PasswordInput } from '../../../../components';
import { tComponentProps } from './_types';

const ResetPasswordComponent = memo((props: tComponentProps) => (
  <form
    className="contain mT4"
    name="passwordResetForm"
    action="/auth/v1/resetPasswordByEmail"
    onSubmit={props.resetPasswordByEmail}>
    <fieldset>
      <legend>
        <h1 className="fs2 mB4">Enter your new password</h1>
      </legend>
      <label htmlFor="emailInput">
        <h2 className="ffLab fs5 mB1 lh1">
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
        password={props.password}
        placeholder="Example: correct_horse_battery_staple"
        onChange={ev => props.updateState('password', ev)}
      />
      <button
        disabled={props.isClient && (!props.login || !props.password)}
        className="p3 pL4 pR4 mR2">
        Reset my password
      </button>
    </fieldset>
  </form>
));

export default ResetPasswordComponent;
