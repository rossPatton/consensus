import React, { memo } from 'react';
import { tComponentProps } from './_types';

export const LoginComponent = memo((props: tComponentProps) => (
  <div className="contain mT5 pT4 pB5 fx fxdCol aiCtr">
    <form autoComplete="off" onSubmit={props.login}>
      <fieldset>
        <legend className="mB3">
          Login to your account
        </legend>
        <div className="mB3">
          <div className="lh1 fs6 fw600 mB1">
            Username:
          </div>
          <input
            spellCheck
            className="p3 pR4 brdA1 dBl mB3"
            value={props.username}
            onChange={ev => props.updateState('username', ev)}
          />
          <div className="lh1 fs6 fw600 mB1">
            Password:
          </div>
          <input
            type="password"
            className="p3 pR4 brdA1 dBl"
            value={props.password}
            onChange={ev => props.updateState('password', ev)}
          />
        </div>
        <button className="p3 hvrBgGrey1 trans1">
          Login
        </button>
      </fieldset>
    </form>
  </div>
));
