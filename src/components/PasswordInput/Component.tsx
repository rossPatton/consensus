import React, { memo } from 'react';
import cx from 'classnames';

export const PasswordInputComponent = memo((props: any) => {
  const len = props.password.length;

  return (
    <>
      <div className="fx mB2">
        <input
          id="pwInput"
          name="password"
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
      <div className="mB2 maxWidth fx aiCtr">
        <span className="fs6 mR2">
          {len < 12 && 'Weak'}
          {(len >= 12 && len < 24) && 'Passable'}
          {(len >= 24 && len < 32) && 'Strong'}
          {(len >= 32) && 'Very Strong'}
        </span>
        <div className="col bgWhite brdA1 br8 p1">
          <span
            className={cx({
              'br8 dBl trans1': true,
              p1: len > 0,
              bgRedLite: len < 12,
              bgYellowLite: len >= 12 && len < 24,
              bgGreenLite: len >= 24 && len < 32,
              bgGreen: len >= 32,
            })}
            style={{
              maxWidth: '100%',
              width: len > 0 ? `${len * 3.125}%` : '0%',
            }}
          />
        </div>
      </div>
      <ul className="fs6 lh1 lsDisc mL3">
        <li className="mB1">Do not use a common password, or one you have used before.</li>
        <li>We recommend using a password manager to generate a strong randomized passphrase.</li>
      </ul>
    </>
  );
});
