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
            Code
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
            className="p-2 w-full mb-2"
            value={props.token}
            onChange={ev => props.updateState('token', ev)}
          />
        </label>
      </>
    )}
    renderSubmit={formProps => (
      <button
        disabled={!formProps.hasMounted || !props.token}
        className="hover:bg-gray-3 p-2 pl-3 pr-3 mr-1">
        Login
      </button>
    )}
  />
));
