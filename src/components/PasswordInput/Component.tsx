import cx from 'classnames';
import React, { memo } from 'react';

import {tComponentProps} from './_types';

export const PasswordInputComponent = memo((props: tComponentProps) => {
  const len = props.password.length;
  const {errors = {}, name = 'password'} = props;
  const hasError = errors.password && errors.password.length > 0;

  return (
    <>
      <label htmlFor={`${props.id}`}>
        <h3 className="ffLab fs5">
          {props.title || 'Password'}
        </h3>
        {(!props.newPassword && !props.hideRequiredMessage) && (
          <p className="fs5 copyBlack mB1">
            Required to make any changes to your account or profile.
          </p>
        )}
        <div className="fx mB2">
          <input
            id={props.id}
            name={name}
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
            <li className="mB1">Passwords must be at least 12 characters long, and can&apos;t be things like &quot;password&quot;, &quot;123456&quot; or &quot;abcdef&quot;.</li>
            <li className="mB1">We strongly recommend adding numbers, capitals, or special characters, but they aren&apos;t required.</li>
            <li className="mB1">Use a password manager to generate and save strong passwords!</li>
          </ul>
        </>
      )}
    </>
  );
});
