import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {PasswordInput} from '../../../../components';
import {tComponentProps} from './_types';

export const UserSignupComponent = memo((props: tComponentProps) => (
  <form
    method="POST"
    name="userSignupForm"
    autoComplete="off"
    action="/api/v1/user"
    onSubmit={props.register}>
    <fieldset>
      <legend>
        <h2 className="mb-4">New User</h2>
      </legend>
      <label htmlFor="usernameInput">
        <h2 className="fs5 mb-1 leading-none">
          Login
        </h2>
        <p className="fs5 copyBlack mb-1">
          A unique name that you&apos;ll use to login with. Keep secret!
        </p>
        <input
          required
          id="loginInput"
          name="login"
          autoComplete="off"
          placeholder="yourSecretNameForLoggingIn"
          value={props.login}
          onChange={ev => props.updateState('login', ev)}
          className="p-3 mb-3 w-full"
        />
      </label>
      <PasswordInput
        required
        newPassword
        id="pwInput"
        errors={props.errors}
        password={props.password}
        placeholder="correct_horse_battery_staple"
        onChange={ev => props.updateState('password', ev)}
      />
      <button
        disabled={props.isClient && (!props.password || !props.login)}
        className="trans1 hover:bg-gray-11 p-3 pl-4 pR4 mr-2">
        Sign up
      </button>
      <Link
        to="/signup"
        className="btn trans1 hover:bg-gray-11 p-3 pl-4 pR4">
        Or go back
      </Link>
      {props.errArr.length > 0 && (
        <ul className="text-sm text-bold brdT1 brdRed pt-3 mt-3 leading-none red">
          {props.errArr.map((err, i) => (
            <li key={i} className="mb-1">
              {err}
            </li>
          ))}
        </ul>
      )}
    </fieldset>
  </form>
));
