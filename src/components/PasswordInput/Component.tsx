import cx from 'classnames';
import React, { memo } from 'react';

import {tComponentProps} from './_types';

export const PasswordInputComponent = memo((props: tComponentProps) => {
  const len = props.password.length;
  const {errors = {}, name = 'password'} = props;
  const hasError = errors.password && errors.password.length > 0;
  const inlineStyle = len === 0
    ? {}
    : {
      height: '5px',
      width: len > 0 ? `${len * 3.125}%` : '0%',
    };

  const showSubtitle = !props.newPassword && !props.hideRequiredMessage;

  return (
    <>
      <label htmlFor={`${props.id}`}>
        <h3
          className={cx({
            'text-base font-bold leading-none': true,
            'mb-1': !showSubtitle,
          })}>
          {props.title || 'Password'}
        </h3>
        {showSubtitle && (
          <p className="mb-1">
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
              'p-2 w-full mb-1 d:mb-0 mr-2': true,
              'border-red-1': hasError,
            })}
          />
          <button
            type="button"
            className="flex flex-row items-center justify-center hover:bg-gray-3 transition p-2 pl-3 pr-3"
            onClick={props.togglePWVisibility}>
            <img
              alt=""
              className="mr-1/2"
              height="12"
              src="/images/eye.svg"
              width="18"
            />
            {props.showPW ? 'Hide' : 'Reveal'} Password
          </button>
        </div>
      </label>
      {props.newPassword && (
        <>
          {len > 0 && (
            <div className="mb-2 flex items-center">
              <span className="text-sm mr-2">
                {len < 12 && 'Weak'}
                {(len >= 12 && len < 24) && 'Passable'}
                {(len >= 24 && len < 32) && 'Strong'}
                {(len >= 32) && 'Very Strong'}
              </span>
              <div className="bg-white w-full contain-sm border rounded-lg p-1">
                <span
                  className={cx({
                    'rounded-lg block transition': true,
                    'bg-red-1': len < 12,
                    'bg-yellow-2': len >= 12 && len < 24,
                    'bg-green-1': len >= 24 && len < 32,
                    'bg-green-2': len >= 32,
                  })}
                  style={inlineStyle}
                />
              </div>
            </div>
          )}
          <ul className="text-sm leading-tight list-disc ml-2 mb-3">
            <li className="mb-1">Passwords must be at least 12 characters long, and can&apos;t be too common like &quot;password&quot;.</li>
            <li className="mb-1">We strongly recommend adding numbers, capitals, or special characters, but they aren&apos;t required.</li>
            <li className="mb-1">Use a password manager to generate and save strong passwords!</li>
          </ul>
        </>
      )}
    </>
  );
});
