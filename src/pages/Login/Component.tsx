// import HCaptcha from '@hcaptcha/react-hcaptcha';
import React, { memo } from 'react';
import {Link} from 'react-router-dom';

import { Form, PasswordInput } from '~app/components';

import { tComponentProps } from './_types';

export const LoginComponent = memo((props: tComponentProps) => (
  <>
    <Form
      captcha
      error={props.error}
      method="POST"
      className="bg-white rounded shadow m-auto contain-sm mb-3 p-2 d:p-3"
      legend="Login to your account"
      name="userLoginForm"
      action="/auth/v1/login"
      onSubmit={props.onSubmit}
      renderFields={() => (
        <>
          <label htmlFor="loginInput">
            <h3 className="font-bold text-base mb-1">
              Login
            </h3>
            <input
              required
              autoComplete="login"
              minLength={3}
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
            placeholder="your_very_secure_password"
            required
          />
        </>
      )}
      renderSubmit={(formProps: any) => (
        <button
          disabled={formProps.hasMounted
            && (!props.password || !props.username || !formProps.token)}
          className="p-2 pl-3 pr-3 d:mr-2 hover:bg-gray-2 mb-2">
          Login
        </button>
      )}
    />
    <div className="flex flex-col d:flex-row justify-center contain m-auto">
      <Link
        to="/signup"
        className="bg-white p-2 rounded font-bold text-base mb-2 d:mb-0 d:mr-2">
        Sign Up
      </Link>
      <Link
        to="/password-reset"
        className="bg-white p-2 rounded font-bold p-2 d:mr-2 mb-2 d:mb-0 d:mr-2">
        Reset Password
      </Link>
      <Link
        to="/login-reset"
        className="bg-white p-2 rounded font-bold p-2">
        Reset Login
      </Link>
    </div>
  </>
));
