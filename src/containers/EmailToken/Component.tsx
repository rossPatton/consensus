import _ from 'lodash';
import React, {memo} from 'react';

import {Form} from '~app/components';

import {tComponentProps} from './_types';

export const EmailTokenComponent = memo((props: tComponentProps) => (
  <Form
    includeCaptcha
    className="animated fadeInUp"
    error={props.error}
    legend={props.includeLegend || (<h2 className="text-base font-semibold mb-1">
      Let&apos;s start by verifying your email. This is all you&apos;ll need to sign in!
    </h2>)}
    name="emailVerificationForm"
    onSubmit={props.sendToken}
    renderFields={() => (
      <>
        <label htmlFor="emailInput">
          <input
            required
            autoComplete="email"
            name="email" // for non-js submit and passportjs
            id="emailInput"
            placeholder="your_email@example.com"
            className="p-2 w-full mb-2"
            value={props.email}
            onChange={ev => props.updateState('email', ev)}
            type="email"
          />
        </label>
      </>
    )}
    renderSubmit={(formProps: any) => {
      const disabled = !formProps.hasMounted || !props.email;
      // disabled = !formProps.captcha;

      return (
        <button
          disabled={disabled}
          className="hover:bg-gray-3 p-2 pl-3 pr-3 mr-1">
          {props.actionLabel}
        </button>
      );
    }}
  />
));
