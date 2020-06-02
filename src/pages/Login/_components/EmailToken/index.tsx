import _ from 'lodash';
import React, {memo} from 'react';

import {Form} from '~app/components';

import {tProps} from './_types';

export const EmailTokenComponent = memo((props: tProps) => (
  <Form
    includeCaptcha
    className="animated fadeInUp"
    error={props.error}
    legend="Login with email"
    name="emailVerificationForm"
    onSubmit={props.sendToken}
    renderFields={() => (
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
    )}
    renderSubmit={(formProps: any) => (
      <button
        disabled={!formProps.hasMounted || !props.email || !formProps.captcha}
        className="hover:bg-gray-3 p-2 pl-3 pr-3 mr-1">
        Email Login Token
      </button>
    )}
  />
));
