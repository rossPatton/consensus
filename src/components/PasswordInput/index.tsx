import React, { memo } from 'react';

export const PasswordInput = memo((props: any) => (
  <>
    <div className="fx mB2">
      <input
        required={props.required}
        autoComplete={props.autoComplete}
        className="p3 row mR2"
        placeholder={props.placeholder}
        value={props.password}
        onChange={ev => props.updateState('password', ev)}
        type={props.showPW ? 'text' : 'password'}
      />
      <button
        type="button"
        className="bgWhite pL4 pR4"
        onClick={props.togglePWVisibility}>
        {props.showPW ? 'Hide' : 'Reveal'} Password
      </button>
    </div>
    {!props.error && !props.password && (
      <ul className="fs6 lh1 lsDisc mL3">
        <li className="mB1">Password must be at least 12 characters long.</li>
        <li className="mB1">Do not use a common password, or one you have used before.</li>
        <li>Use a password manager to generate a strong randomized passphrase.</li>
      </ul>
    )}
    {!props.error && props.password && (
      <div>
        <span
          className="br8 dBl bgGreen p1"
          style={{
            maxWidth: '100%',
            width: `${props.password.length * 8}%`,
          }}
        />
      </div>
    )}
    {props.error && (
      <span className="fs6 fw600 red">
        {props.error}
      </span>
    )}
  </>
));
