import React, { memo } from 'react';
import {Link} from 'react-router-dom';

import { PasswordInput } from '../../components';
import { tComponentProps } from './_types';

export const LoginComponent = memo((props: tComponentProps) => (
  <>
    <form
      method="POST"
      className="contain mt-4 mb-3"
      name="userLoginForm"
      autoComplete="off"
      action="/auth/v1/login"
      onSubmit={props.login}>
      <fieldset>
        <legend>
          <h1 className="fs2 mb-3">Login to your account</h1>
        </legend>
        <label htmlFor="loginInput">
          <h3 className="fs5 mb-1">Login</h3>
          <input
            required
            autoComplete="login"
            name="username" // for non-js submit and passportjs
            id="loginInput"
            placeholder="yourSecretLogin"
            className="p-3 w-full mb-3"
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
          disabled={props.isClient && (!props.password || !props.username)}
          className="p-3 pl-4 pR4 mr-2">
          Login
        </button>
        <Link to="/password-reset" className="btn p-3 pl-4 pR4">
          Forget your password?
        </Link>
      </fieldset>
    </form>
    {props.error && (
      <div className="black text-bold contain">
        {props.error}
      </div>
    )}
    <div className="contain">
      <Link to="/signup">
        Or create a new account
      </Link>
    </div>
  </>
));
