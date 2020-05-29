import cx from 'classnames';
import React, { memo } from 'react';

import {StrengthMeter} from './_components';
import {tComponentProps} from './_types';

export const PasswordInputComponent = memo((props: tComponentProps) => {
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
        <div className="flex flex-row items-center mb-2 relative">
          <input
            id={props.id}
            name={props.name}
            maxLength={4096}
            autoComplete={props.newPassword ? 'new-password' : 'on'}
            required={props.required}
            placeholder={props.placeholder}
            value={props.password}
            onChange={props.onChange}
            type={props.showPW ? 'text' : 'password'}
            className={cx({
              'w-full': true,
              'border-red-1': props.errors.password
                && props.errors.password.length > 0,
            })}
          />
          <button
            type="button"
            className="bg-gray-1 rounded-0 absolute t b r p-2"
            onClick={() => props.togglePWVisibility(!props.showPW)}>
            {!props.showPW && (
              <img
                alt={!props.isDesktop ? `${props.showPW ? 'Hide' : 'Reveal'} Password` : ''}
                height="12"
                src="/images/eye.svg"
                width="18"
              />
            )}
            {props.showPW && (
              <img
                alt={!props.isDesktop ? `${props.showPW ? 'Hide' : 'Reveal'} Password` : ''}
                height="12"
                src="/images/eye_closed.svg"
                width="18"
              />
            )}
          </button>
        </div>
      </label>
      {props.newPassword && (
        <StrengthMeter
          password={props.password}
        />
      )}
    </>
  );
});
