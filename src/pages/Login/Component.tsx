import React, { memo } from 'react';
import {Link} from 'react-router-dom';

import { PasswordInput } from '~app/components';

import { tComponentProps } from './_types';

export const LoginComponent = memo((props: tComponentProps) => (
  <>
    <form
      method="POST"
      className="mb-3"
      name="userLoginForm"
      autoComplete="off"
      action="/auth/v1/login"
      onSubmit={props.login}>
      <fieldset>
        <legend>
          <h1 className="mb-2">
            Login to your account
          </h1>
        </legend>
        <label htmlFor="loginInput">
          <h3 className="font-bold text-base mb-1">
            Login
          </h3>
          <input
            required
            autoComplete="login"
            name="username" // for non-js submit and passportjs
            id="loginInput"
            placeholder="yourSecretLogin"
            className="p-2 w-full mb-2"
            value={props.username}
            onChange={ev => props.updateState('username', ev)}
          />
        </label>
        <PasswordInput
          hideRequiredMessage
          id="pwInput"
          onChange={ev => props.updateState('password', ev)}
          password={props.password}
          placeholder="your_very_secure_password_here"
          required
        />
        <button
          disabled={props.hasMounted && (!props.password || !props.username)}
          className="p-2 pl-3 pr-3 mr-2 hover:bg-gray-2">
          Login
        </button>
        <Link
          to="/password-reset"
          className="btn p-2 pl-3 pr-3 hover:bg-gray-2">
          Forget your password?
        </Link>
      </fieldset>
    </form>
    {props.error && (
      <b>
        {props.error}
      </b>
    )}
    <Link to="/signup">
      Or create a new account
    </Link>
  </>
));
