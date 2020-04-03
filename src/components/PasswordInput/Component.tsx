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
        <h3 className="fs5">
          {props.title || 'Password'}
        </h3>
        {(!props.newPassword && !props.hideRequiredMessage) && (
          <p className="fs5 copyBlack mb-1">
            Required to make any changes to your account or profile.
          </p>
        )}
        <div className="flex flex-col d:flex-row mb-2">
          <input
            id={props.id}
            name={name}
            maxLength={4096}
            autoComplete={props.newPassword ? 'new-password' : 'on'}
            required={props.required}
            placeholder={props.placeholder}
            value={props.password}
            onChange={props.onChange}
            type={props.showPW ? 'text' : 'password'}
            className={cx({
              'p-3 w-full mr-2': true,
              brdRed: hasError,
            })}
          />
          <button
            type="button"
            className="bg-white hover:bg-gray-11 trans1 pl-4 pR4"
            onClick={props.togglePWVisibility}>
            {props.showPW ? 'Hide' : 'Reveal'} Password
          </button>
        </div>
      </label>
      {props.newPassword && (
        <>
          <div className="mb-2 maxWidth flex items-center">
            <span className="text-sm mr-2">
              {len < 12 && 'Weak'}
              {(len >= 12 && len < 24) && 'Passable'}
              {(len >= 24 && len < 32) && 'Strong'}
              {(len >= 32) && 'Very Strong'}
            </span>
            <div className=" bgYellowLite brdA1 br8 p-1">
              <span
                className={cx({
                  'br8 dBl trans1 containRow': true,
                  'p-1': len > 0,
                  'bg-red-1': len < 12,
                  'bg-yellow-1': len >= 12 && len < 24,
                  'bg-green-1': len >= 24 && len < 32,
                  'bg-green-2': len >= 32,
                })}
                style={{
                  width: len > 0 ? `${len * 3.125}%` : '0%',
                }}
              />
            </div>
          </div>
          <ul className="text-sm leading-none lsDisc mL3 mb-4">
            <li className="mb-1">Passwords must be at least 12 characters long, and can&apos;t be too common like &quot;password&quot;.</li>
            <li className="mb-1">We strongly recommend adding numbers, capitals, or special characters, but they aren&apos;t required.</li>
            <li className="mb-1">Use a password manager to generate and save strong passwords!</li>
          </ul>
        </>
      )}
    </>
  );
});
