import {PasswordInput} from '@app/components';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

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
        <h2 className="mb-3">New User</h2>
      </legend>
      <label htmlFor="usernameInput">
        <h2 className="text-base mb-1">
          Login
        </h2>
        <p className="mb-1">
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
          className="p-2 mb-2 w-full"
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
      <div className="flex mb-3">
        <button
          disabled={props.hasMounted && (!props.password || !props.login)}
          className="hover:bg-gray-3 p-2 pl-3 pr-3 mr-1">
          Sign up!
        </button>
        <Link
          to="/signup"
          className="btn hover:bg-gray-3 p-2 pl-3 pr-3">
          Or go back
        </Link>
      </div>
      {props.errArr.length > 0 && (
        <ul className="text-sm font-bold leading-tight">
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
