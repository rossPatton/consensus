import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';

import {Form} from '~app/components';

import {tComponentProps} from './_types';

export const EmailTokenComponent = memo((props: tComponentProps) => (
  <Form
    includeCaptcha
    className="animated fadeInUp"
    error={props.error}
    legend={props.legend || (<h2 className="text-base font-semibold mb-1">
      Let&apos;s start by verifying your email. This is all you&apos;ll need to sign in!
    </h2>)}
    name="emailVerificationForm"
    onSubmit={props.sendToken}
    renderFields={() => (
      <label htmlFor="emailInput">
        <span className="viz-hidden">
          Enter email
        </span>
        <input
          required
          autoComplete="email"
          name="email" // for non-js submit and passportjs
          id="emailInput"
          maxLength={4096}
          placeholder="your_email@example.com"
          className="p-2 w-full mb-2"
          value={props.email}
          onChange={ev => props.updateState('email', ev)}
          type="email"
        />
      </label>
    )}
    renderSubmit={formProps => {
      const disabled = !formProps.hasMounted || !props.email || !formProps.captcha;

      return (
        <>
          <button
            disabled={disabled}
            className={cx({
              'p-2 pl-3 pr-3 mb-1': true,
              'bg-green-1 hover:bg-green-2': !disabled,
            })}>
            {props.actionLabel}
          </button>
          {props.tokensThunk.isLoading
            && (
              <div className="font-semibold">
                Sending email. Please wait.
              </div>
            )}
        </>
      );
    }}
  />
));
