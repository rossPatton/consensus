import _ from 'lodash';
import React, {memo} from 'react';

import {Form} from '~app/components';

import {tProps} from './_types';

export const VerifyAndLoginComponent = memo((props: tProps) => (
  <Form
    className="animated fadeInUp"
    error={props.error}
    legend="Verify and login"
    name="userSignupForm"
    onSubmit={props.verifyAndLogin}
    renderFields={() => (
      <>
        <label htmlFor="tokenInput">
          <h2 className="text-base font-bold mb-1 leading-none">
            Token
          </h2>
          <p>
            Copy/paste or type the token that was sent to your email to complete the form.
          </p>
          <input
            required
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
    renderSubmit={(formProps: any) => (
      <button
        disabled={!formProps.hasMounted || !props.token}
        className="hover:bg-gray-3 p-2 pl-3 pr-3 mr-1">
        Login
      </button>
    )}
  />
));
