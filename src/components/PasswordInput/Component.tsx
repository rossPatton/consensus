import React, { memo } from 'react';
import cx from 'classnames';

export const PasswordInputComponent = memo((props: any) => {
  const len = props.password.length;
  const { errors = {} } = props;
  const hasError = errors.password && errors.password.length > 0;

  return (
    <>
      <label htmlFor={props.id}>
        <h2 className="ffLab fs5 mB1 lh1">
          {props.title || 'Password'}
        </h2>
        <div className="fx mB2">
          <input
            id={props.id}
            name={props.name || 'password'}
            autoComplete={props.newPassword ? 'new-password' : 'on'}
            required={props.required}
            placeholder={props.placeholder}
            value={props.password}
            onChange={props.onChange}
            type={props.showPW ? 'text' : 'password'}
            className={cx({
              'p3 row mR2': true,
              brdRed: hasError,
            })}
          />
          <button
            type="button"
            className="bgWhite hvrBgGrey1 trans1 pL4 pR4"
            onClick={props.togglePWVisibility}>
            {props.showPW ? 'Hide' : 'Reveal'} Password
          </button>
        </div>
      </label>
      {props.newPassword && (
        <>
          <div className="mB2 maxWidth fx aiCtr">
            <span className="fs6 mR2">
              {len < 12 && 'Weak'}
              {(len >= 12 && len < 24) && 'Passable'}
              {(len >= 24 && len < 32) && 'Strong'}
              {(len >= 32) && 'Very Strong'}
            </span>
            <div className="col bgYellowLite brdA1 br8 p1">
              <span
                className={cx({
                  'br8 dBl trans1': true,
                  p1: len > 0,
                  bgRedLite: len < 12,
                  bgYellow: len >= 12 && len < 24,
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
          <ul className="fs6 lh1 lsDisc mL3 mB4">
            <li className="mB1">Do not use a common password, or one you have used before.</li>
            <li className="mB1">Minimum password length is 12 characters - but longer is better.</li>
            <li className="mB1">We strongly recommend adding numbers, capitals, or special characters.</li>
          </ul>
        </>
      )}
    </>
  );
});
