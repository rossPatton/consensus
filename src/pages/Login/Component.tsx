import React, { memo } from 'react';
import { tComponentProps } from './_types';

export const LoginComponent = memo((props: tComponentProps) => (
  <form
    className="contain fx fxdCol aiCtr"
    name="userLoginForm"
    autoComplete="off"
    action="/auth/login"
    method="POST"
    onSubmit={props.login}>
    <fieldset>
      <legend className="mB3">
        Login to your account
      </legend>
      <div className="mB3">
        <label htmlFor="usernameInput">
          <div className="lh1 fs6 fw600 mB1">
            Username:
          </div>
          <input
            spellCheck
            id="usernameInput"
            name="username"
            className="p3 pR4 brdA1 dBl mB3"
            value={props.username}
            onChange={ev => props.updateState('username', ev)}
          />
        </label>
        <label htmlFor="pwInput">
          <div className="lh1 fs6 fw600 mB1">
            Password:
          </div>
          <input
            type="password"
            id="pwInput"
            name="password"
            className="p3 pR4 brdA1 dBl"
            value={props.password}
            onChange={ev => props.updateState('password', ev)}
          />
        </label>
      </div>
      <button className="p3 hvrBgGrey1 trans1">
          Login
      </button>
    </fieldset>
  </form>
));
