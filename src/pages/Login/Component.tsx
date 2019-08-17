import React, { memo } from 'react';
import { tComponentProps } from './_types';

export const LoginComponent = memo((props: tComponentProps) => (
  <>
    <form className="p4 mT5" onSubmit={props.login}>
      <fieldset>
        <legend>Login to your User account</legend>
        <div>
          <input className="p1 brdA1 dBl mB1" placeholder="Username here" value={props.username} onChange={props.updateUsername} />
          <input className="p1 brdA1 dBl mB1" type="password" placeholder="Password here" value={props.password} onChange={props.updatePassword} />
        </div>
        <button>Login</button>
      </fieldset>
    </form>
  </>
));
