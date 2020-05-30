import React, { memo } from 'react';
import {Link} from 'react-router-dom';

import { PasswordInput } from '~app/components';

import { tProps } from './_types';

const ResetPasswordComponent = memo((props: tProps) => (
  <form
    name="passwordResetForm"
    onSubmit={props.resetPasswordByEmail}>
    <fieldset>
      <legend>
        <h1 className="black fs2 mb-2">Enter new password</h1>
        <h2 className="text-sm mb-4 leading-none">
          Enter the code sent to your email, along with your login credentials
        </h2>
      </legend>
      <label htmlFor="tokenInput">
        <h2 className="text-base font-bold mb-1 leading-none">
          Token
        </h2>
        <input
          required
          autoComplete="off"
          name="token" // for non-js submit and passportjs
          id="tokenInput"
          placeholder="Enter the token you received via email"
          className="p-2 w-full mb-2"
          value={props.token}
          onChange={ev => props.updateState('token', ev)}
        />
      </label>
      <label htmlFor="usernameInput">
        <h2 className="text-base font-bold mb-1 leading-none">
          Login
        </h2>
        <input
          required
          autoComplete="username"
          minLength={3}
          name="username" // for non-js submit and passportjs
          id="usernameInput"
          placeholder="Enter the secret login for your account"
          className="p-2 w-full mb-2"
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
      <div className="flex flex-col d:flex-row items-center">
        <button
          disabled={props.hasMounted && (!props.login || !props.password)}
          className="hover:bg-gray-1 p-2 pl-3 pr-3 mr-2">
          Reset Password
        </button>
        <Link
          to="/password-reset"
          className="hover:bg-gray-1 btn p-2 pl-3 pr-3">
          Didn&apos;t get a code?
        </Link>
      </div>
    </fieldset>
  </form>
));

export default ResetPasswordComponent;
