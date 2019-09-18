import React, { memo } from 'react';

import { PasswordInput } from '../../components';
import { tComponentProps } from './_types';

export const LoginComponent = memo((props: tComponentProps) => (
  <div className="fx jcBetween contain mT4">
    <form
      method="POST"
      className="col p4 br8 brdA1 mR2"
      name="userLoginForm"
      autoComplete="off"
      action="/auth/login"
      onSubmit={props.userLogin}>
      <fieldset>
        <legend className="mB3">
          <h2>User Login</h2>
        </legend>
        <label htmlFor="uLoginInput">
          <h3 className="mB1 lh1">Account Name</h3>
          <input
            required
            name="username" // for non-js submit and passportjs
            id="uLoginInput"
            placeholder="your@email.com"
            className="p3 row mB3"
            value={props.uLogin}
            onChange={ev => props.updateState('uLogin', ev)}
          />
        </label>
        <PasswordInput
          required
          id="pwInput"
          password={props.uPassword}
          placeholder="your_very_secure_password_here"
          onChange={ev => props.updateState('uPassword', ev)}
        />
        <button
          disabled={props.isClient && (!props.uPassword || !props.uLogin)}
          className="p3 pL4 pR4 hvrBgGrey1 trans1">
          Login
        </button>
      </fieldset>
    </form>
    <form
      method="POST"
      className="col p4 br8 brdA1 mL2"
      name="orgLoginForm"
      autoComplete="off"
      action="/auth/login"
      onSubmit={props.orgLogin}>
      <fieldset>
        <legend className="mB3">
          <h2>Org Login</h2>
        </legend>
        <label htmlFor="oLoginInput">
          <h3 className="mB1 lh1">Account Name</h3>
          <input
            required
            id="oLoginInput"
            name="username" // for non-js submit and passportjs
            placeholder="org@email.com"
            className="p3 row mB3"
            value={props.oLogin}
            onChange={ev => props.updateState('oLogin', ev)}
          />
        </label>
        <PasswordInput
          required
          id="oPWInput"
          password={props.oPassword}
          placeholder="your_very_secure_password_here"
          onChange={ev => props.updateState('oPassword', ev)}
        />
        <button
          disabled={props.isClient && (!props.oPassword || !props.oLogin)}
          className="p3 pL4 pR4 hvrBgGrey1 trans1">
          Login
        </button>
      </fieldset>
    </form>
  </div>
));
