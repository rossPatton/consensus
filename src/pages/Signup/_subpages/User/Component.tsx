import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Form, PasswordInput} from '~app/components';

import {tComponentProps} from './_types';

export const UserSignupComponent = memo((props: tComponentProps) => (
  <Form
    captcha
    error={props.error}
    legend="New User"
    name="userSignupForm"
    onSubmit={props.register}
    renderFields={() => (
      <>
        <label htmlFor="loginInput">
          <h2 className="text-base font-semibold">
            <b>Private</b> Login
          </h2>
          <p className="mb-1">
            A unique name or phrase that you&apos;ll only use to login with. No one else will see this. Can be changed at any time. Keep secret!
          </p>
          <input
            required
            id="loginInput"
            maxLength={4096}
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
          <h2 className="text-base font-semibold">
            <b>Public</b> Username
          </h2>
          <p className="mb-1">
            A unique name that&apos;ll be what other users see when you use the site. This is public, and can be changed at any time!
          </p>
          <input
            required
            id="usernameInput"
            maxLength={4096}
            minLength={3}
            name="username"
            type="text"
            autoComplete="off"
            placeholder="myPublicHandle"
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
            maxLength={4096}
            name="email"
            type="email"
            autoComplete="off"
            placeholder="yourEmail@example.com"
            value={props.email}
            onChange={ev => props.updateState('email', ev)}
            className="p-2 mb-2 w-full"
          />
        </label>
        <PasswordInput
          required
          newPassword
          id="pwInput"
          password={props.password}
          placeholder="correct_horse_battery_staple"
          onChange={ev => props.updateState('password', ev)}
        />
      </>
    )}
    renderSubmit={(formProps: any) => (
      <div className="flex mb-3">
        <button
          disabled={formProps.hasMounted && !formProps.token}
          className="hover:bg-gray-3 p-2 pl-3 pr-3 mr-1">
          Sign up!
        </button>
        <Link
          to="/signup"
          className="btn hover:bg-gray-3 p-2 pl-3 pr-3">
          Or go back
        </Link>
      </div>
    )}
  />
));
