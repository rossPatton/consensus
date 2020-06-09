import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

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
            Copy/paste or type the token that was sent to your email to finish logging in.
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
        <p className="font-sm">
          Didn&apos; get a token? Click <button className="border-0 p-0" type="button" onClick={() => props.sendToken(props.email)}>here</button> to send again.
        </p>
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
        <div
          tabIndex={0}
          role="button"
          className="flex items-center font-semibold text-sm mb-3 cur-ptr"
          onClick={() => props.toggleTerms(!props.termsAccepted)}
          onKeyPress={() => props.toggleTerms(!props.termsAccepted)}>
          <label htmlFor="terms">
            <input
              readOnly
              name="terms"
              type="checkbox"
              className="flex-1 mr-1 w-auto"
              autoComplete="nope"
              checked={props.termsAccepted}
            />
          </label>
          <span className="w-full">
            I have read and agree to the <Link to="/terms-and-conditions">Terms and Conditions</Link> and <Link to="/privacy-policy">Privacy Policy</Link>
          </span>
        </div>
      </>
    )}
    renderSubmit={formProps => {
      const disabled = !formProps.hasMounted
        || !props.token
        || !props.termsAccepted
        || !props.username;

      return (
        <button
          disabled={disabled}
          className="hover:bg-gray-3 p-2 pl-3 pr-3 mr-1">
          Sign up!
        </button>
      );
    }}
  />
));
