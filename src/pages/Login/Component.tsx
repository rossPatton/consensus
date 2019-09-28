import React, { memo } from 'react';

import { PasswordInput } from '../../components';
import { tComponentProps } from './_types';

export const LoginComponent = memo((props: tComponentProps) => (
  <div className="contain mT4">
    <h1 className="fs2 taCtr">Login to your account</h1>
    <div className="fs6 taCtr mB3">
      By signing up, you agree to our Terms and that you have read our Privacy Policy and Content Policy.
    </div>
    <div className="fx jcBetween">
      <form
        method="POST"
        className="col p4 br8 brdA1 mR2"
        name="userLoginForm"
        autoComplete="off"
        action="/auth/login"
        onSubmit={props.userLogin}>
        <fieldset>
          <legend className="mB3">
            <h2>User</h2>
          </legend>
          <label htmlFor="uLoginInput">
            <h3 className="ffLab fs5 mB1">Login</h3>
            <input
              required
              name="username" // for non-js submit and passportjs
              id="uLoginInput"
              placeholder="yourSecretUserLoginName"
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
            <h2>Org</h2>
          </legend>
          <label htmlFor="oLoginInput">
            <h3 className="ffLab fs5 mB1">Login</h3>
            <input
              required
              id="oLoginInput"
              name="username" // for non-js submit and passportjs
              placeholder="yourSecretOrgLoginName"
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
  </div>
));
