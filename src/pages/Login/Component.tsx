import React, { memo } from 'react';
import { tComponentProps } from './_types';

export const LoginComponent = memo((props: tComponentProps) => (
  <div className="contain mT5 pT4 pB5 fx fxdCol aiCtr">
    <form onSubmit={props.login}>
      <fieldset>
        <legend className="mB2">
          Login to your account
        </legend>
        <div className="mB3">
          <input
            spellCheck
            className="p3 pR4 brdA1 dBl mB2"
            placeholder="Username here"
            value={props.username}
            onChange={props.updateUsername}
          />
          <input
            type="password"
            className="p3 pR4 brdA1 dBl"
            placeholder="Password here"
            value={props.password}
            onChange={props.updatePassword}
          />
        </div>
        <button className="p3 hvrBgGrey1 trans1">
          Login
        </button>
      </fieldset>
    </form>
  </div>
));
