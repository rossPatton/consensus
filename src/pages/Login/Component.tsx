import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';

import {Form} from '~app/components';

import {tComponentProps} from './_types';

export const LoginComponent = memo((props: tComponentProps) => (
  <Form
    className="animated fadeInUp"
    error={props.error}
    legend={(<h2 className="text-base font-semibold mb-2">
      Verify to sign in.
    </h2>)}
    name="userSignupForm"
    onSubmit={() => props.verifyAndLogin(props.email)}
    renderFields={() => (
      <>
        <label htmlFor="tokenInput">
          <h2 className="text-base font-semibold">
            Verification Code
          </h2>
          <p>
            Copy/paste or type the 6 digit code that was sent to your email to finish logging in.
          </p>
          <input
            required
            pattern="^[0-9]{1,6}$"
            autoComplete="off"
            name="token" // for non-js submit and passportjs
            id="tokenInput"
            placeholder="Enter the token you received via email"
            className="p-2 w-full mb-1/2"
            value={props.token}
            onChange={ev => props.updateState('token', ev)}
          />
        </label>
        <p className="font-sm flex items-baseline mb-2">
          Didn&apos;t get a code? Click <button className="border-0 ml-1/2 mr-1/2 p-0 underline" type="button" onClick={() => props.sendToken(props.email)}>here</button> to send again.
        </p>
      </>
    )}
    renderSubmit={formProps => {
      const disabled = !formProps.hasMounted || !props.token;
      return (
        <button
          disabled={disabled}
          className={cx({
            'p-2 pl-3 pr-3': true,
            'bg-green-1 hover:bg-green-2': !disabled,
          })}>
          Login
        </button>
      );
    }}
  />
));
