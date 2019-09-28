import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';

import {PasswordInput} from '../../../../components';
import {tComponentProps} from './_types';

export const UserSignupComponent = memo((props: tComponentProps) => (
  <form
    method="POST"
    name="userSignupForm"
    className="p4 br8 brdA1"
    autoComplete="off"
    action="/api/v1/user"
    onSubmit={props.register}>
    <fieldset>
      <legend>
        <h2 className="mB4">New User</h2>
      </legend>
      <label htmlFor="emailInput">
        <h2 className="ffLab fs5 mB1 lh1">Email</h2>
        <p className="fs5 copyBlack mB1">Used for account verification. Kept private by default.</p>
        <input
          required
          name="email"
          id="emailInput"
          value={props.email}
          placeholder="example@youremail.com"
          onChange={ev => props.updateState('email', ev)}
          className={cx({
            'p3 mB3 row': true,
            brdRed: props.errors.email && props.errors.email.length > 0,
          })}
        />
      </label>
      <label htmlFor="usernameInput">
        <h2 className="ffLab fs5 mB1 lh1">
          Username
        </h2>
        <p className="fs5 copyBlack mB1">
          This will be your publicly visible name. Not private by default.
        </p>
        <input
          required
          id="usernameInput"
          name="username"
          placeholder="theNameOtherUsersWillSee"
          value={props.username}
          onChange={ev => props.updateState('username', ev)}
          className="p3 mB3 row"
        />
      </label>
      <label htmlFor="usernameInput">
        <h2 className="ffLab fs5 mB1 lh1">
          Login
        </h2>
        <p className="fs5 copyBlack mB1">
          A unique name that is used just for logging in. Kept private.
        </p>
        <input
          required
          id="loginInput"
          name="login"
          placeholder="yourSecretNameForLoggingIn"
          value={props.login}
          onChange={ev => props.updateState('login', ev)}
          className="p3 mB3 row"
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
        disabled={props.disabled}
        className="trans1 hvrBgGrey1 p3 pL4 pR4">
        Sign up
      </button>
      {props.errArr.length > 0 && (
        <ul className="fs6 fw600 brdT1 brdRed pT3 mT3 lh1 red">
          {props.errArr.map((err, i) => (
            <li key={i} className="mB1">
              {err}
            </li>
          ))}
        </ul>
      )}
    </fieldset>
  </form>
));
