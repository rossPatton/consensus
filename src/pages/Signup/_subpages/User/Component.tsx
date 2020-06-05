import _ from 'lodash';
import React, {memo} from 'react';

import {Form} from '~app/components';

import {tComponentProps} from './_types';

export const UserSignupComponent = memo((props: tComponentProps) => (
  <Form
    className="animated fadeInUp"
    error={props.error}
    legend={(<h2 className="text-base font-semibold mb-2">
      Verify your email and sign up!
    </h2>)}
    name="userSignupForm"
    onSubmit={props.verifyAndRegister}
    renderFields={() => (
      <>
        <label htmlFor="tokenInput">
          <h2 className="text-base font-semibold">
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
        <label htmlFor="usernameInput">
          <h2 className="text-base font-semibold">
            Username
          </h2>
          <p className="mb-1">
            A unique name that&apos;ll be what other users see when you use the site. This is public, and can be changed at any time!
          </p>
          <input
            required
            id="usernameInput"
            maxLength={4096}
            minLength={3}
            name="username"
            type="text"
            autoComplete="off"
            placeholder="myPublicHandle"
            value={props.username}
            onChange={ev => props.updateState('username', ev)}
            className="p-2 mb-2 w-full"
          />
        </label>
      </>
    )}
    renderSubmit={formProps => (
      <button
        disabled={!formProps.hasMounted || !props.token || !props.username}
        className="hover:bg-gray-3 p-2 pl-3 pr-3 mr-1">
        Sign up!
      </button>
    )}
  />
));
