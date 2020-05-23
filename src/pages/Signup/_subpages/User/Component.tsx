import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {PasswordInput} from '~app/components';

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
      <label htmlFor="loginInput">
        <h2 className="text-base mb-1 font-semibold">
          <b>Private</b> Login
        </h2>
        <p className="mb-1">
          A unique name or phrase that you&apos;ll only use to login with. No one else will see this. Can be changed at any time. Keep secret!
        </p>
        <input
          required
          id="loginInput"
          minLength={3}
          name="login"
          type="text"
          autoComplete="off"
          placeholder="yourSecretNameForLoggingIn"
          value={props.login}
          onChange={ev => props.updateState('login', ev)}
          className="p-2 mb-2 w-full"
        />
      </label>
      <label htmlFor="usernameInput">
        <h2 className="text-base mb-1 font-semibold">
          <b>Public</b> Username
        </h2>
        <p className="mb-1">
          A unique name that&apos;ll be what other users see when you use the site. This is public, and can be changed at any time!
        </p>
        <input
          required
          id="usernameInput"
          minLength={3}
          name="username"
          type="text"
          autoComplete="off"
          placeholder="myPublicInternetHandle"
          value={props.username}
          onChange={ev => props.updateState('username', ev)}
          className="p-2 mb-2 w-full"
        />
      </label>
      <label htmlFor="emailInput">
        <h2 className="text-base font-bold">
          Email
        </h2>
        <p className="text-base text-gray-5 mb-1">
          Used for account verification and meeting reminders.
        </p>
        <input
          required
          id="emailInput"
          name="email"
          type="email"
          autoComplete="off"
          placeholder="yourEmail@exampe.com"
          value={props.email}
          onChange={ev => props.updateState('email', ev)}
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
          disabled={props.hasMounted && props.disabled}
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
