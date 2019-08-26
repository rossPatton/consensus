import _ from 'lodash';
import React, { memo } from 'react';
import cx from 'classnames';
import { PasswordInput } from '../../components';
import { tComponentProps } from './_types';

export const SignupComponent = memo((props: tComponentProps) => (
  <>
    <div className="contain mT4 fs6 taCtr mB2">
      By signing up, you agree to our Terms and that you have read our Privacy Policy and Content Policy.
    </div>
    <form
      method="POST"
      name="userSignupForm"
      className="contain p5 pT4 pB4 mB2 br8 brdA1"
      autoComplete="off"
      action="/api/v1/user"
      onSubmit={props.register}>
      <legend className="mB3">
        <h1 className="fs2">Create an account</h1>
      </legend>
      <fieldset>
        <label htmlFor="emailInput">
          <h2 className="ffLab fs5 mB1 lh1">Email</h2>
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
          <h2 className="ffLab fs5 mB1 lh1">Username</h2>
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
  </>
));
