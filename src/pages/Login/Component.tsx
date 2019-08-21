import React, { memo } from 'react';
import { PasswordInput } from '../../components';
import { tComponentProps } from './_types';

export const LoginComponent = memo((props: tComponentProps) => (
  <form
    method="POST"
    className="contain mT4 p5 pT4 pB4 mB2 br8 brdA1"
    name="userLoginForm"
    autoComplete="off"
    action="/auth/login"
    onSubmit={props.login}>
    <fieldset>
      <legend className="mB3">
        <h1 className="fs2">Login to your account</h1>
      </legend>
      <label htmlFor="usernameInput">
        <h2 className="ffLab fs5 mB1 lh1">Username</h2>
        <input
          required
          id="usernameInput"
          name="username"
          placeholder="yourUserNameHere"
          className="p3 row mB3"
          value={props.username}
          onChange={ev => props.updateState('username', ev)}
        />
      </label>
      <PasswordInput
        required
        id="pwInput"
        password={props.password}
        placeholder="your_very_secure_password_here"
        onChange={(ev: any) => props.updateState('password', ev)}
      />
      <button
        disabled={props.isClient && (!props.password || !props.username)}
        className="p3 pL4 pR4 hvrBgGrey1 trans1">
        Login
      </button>
    </fieldset>
  </form>
));
