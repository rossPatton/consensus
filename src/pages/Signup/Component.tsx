import React, { memo } from 'react';
import faker from 'faker';
import { PasswordInput } from '../../components';
import { tComponentProps } from './_types';

export const SignupComponent = memo((props: tComponentProps) => (
  <>
    <form
      name="userSignupForm"
      className="contain p5 pT4 pB4 mB2 bgGrey1 br8"
      autoComplete="off"
      action="/api/v1/user"
      method="POST"
      onSubmit={props.register}>
      <legend className="mB3 ffCooper fs2">
        Create an account
      </legend>
      <fieldset>
        <label htmlFor="emailInput">
          <h2 className="ffLab fs5 mB1 lh1">Email</h2>
          <input
            required
            id="emailInput"
            name="email"
            className="p3 mB3 row"
            placeholder="example@youraddress.com"
            value={props.email}
            onChange={ev => props.updateState('email', ev)}
          />
        </label>
        <label htmlFor="usernameInput">
          <h2 className="ffLab fs5 mB1 lh1">Username</h2>
          <input
            required
            id="usernameInput"
            name="username"
            className="p3 mB3 row"
            placeholder="theNameOtherUsersWillSee"
            value={props.username}
            onChange={ev => props.updateState('username', ev)}
          />
        </label>
        {/* eslint-disable-next-line*/}
        <label htmlFor="pwInput" className="mB3">
          <h2 className="ffLab fs5 mB1 lh1">Password</h2>
          <PasswordInput
            required
            id="pwInput"
            autoComplete="new-password"
            password={props.password}
            placeholder="correct_horse_battery_staple"
            updateState={props.updateState}
          />
        </label>
        <button className="bgWhite p3 pL4 pR4">
          Sign up
        </button>
        {props.errors.length > 0 && (
          <ul className="fs6 fw600 brdT1 brdRed pT3 mT3 lh1 red">
            {props.errors.map(err => (
              <li key={err} className="mB1">
                {err}
              </li>
            ))}
          </ul>
        )}
      </fieldset>
    </form>
    <div className="contain fs6 taCtr">
      By signing up, you agree to our Terms and that you have read our Privacy Policy and Content Policy.
    </div>
  </>
));
