import HCaptcha from '@hcaptcha/react-hcaptcha';
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
      onSubmit={props.login}
    >
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
          placeholder="your_very_secure_password_here"
          required
        />
        <div className="mb-2">
          <HCaptcha
            sitekey={__HCAPTCHA_KEY__}
            onVerify={props.handleVerificationSuccess}
          />
        </div>
        <button
          disabled={props.hasMounted
            && (!props.password || !props.username || !props.token)}
          className="p-2 pl-3 pr-3 d:mr-2 hover:bg-gray-2 mb-2">
          Login
        </button>
        {/* <div className='flex flex-col d:flex-row'>
          <button
            disabled={props.hasMounted
              && (!props.password || !props.username || !props.isVerified)}
            className="p-2 pl-3 pr-3 d:mr-2 hover:bg-gray-2 mb-2">
            Login
          </button>
          <Link
            to="/password-reset"
            className="btn p-2 pl-3 pr-3 d:mr-2 hover:bg-gray-2 mb-2">
            Reset Password
          </Link>
          <Link
            to="/login-reset"
            className="btn p-2 pl-3 pr-3 hover:bg-gray-2 mb-2">
            Reset Login
          </Link>
        </div>*/}
        {props.error && (
          <div className="animated fadeInUp bg-red-2 font-bold p-2 rounded text-white mb-2">
            {props.error}
          </div>
        )}
      </fieldset>
    </form>
    <Link className="font-bold" to="/signup">
      Or create a new account
    </Link>
  </>
));
