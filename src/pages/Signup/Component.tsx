import React, { memo } from 'react';
import { tComponentProps } from './_types';

export const SignupComponent = memo((props: tComponentProps) => (
  <div className="contain mT5 pT4 pB5 fx fxdCol aiCtr">
    <form onSubmit={props.register}>
      <legend className="mB2">Create an account</legend>
      <fieldset>
        <div className="mB3">
          <input
            autoComplete="off"
            className="p3 brdA1 dBl mB2"
            placeholder="Email"
            value={props.email}
            onChange={ev => props.updateState('email', ev)}
          />
          <div className="mB4">
            <div className="fx aiCtr">
              <input
                autoComplete="off"
                className="p3 brdA1 dBl mB2 mR2"
                placeholder="Password"
                value={props.password}
                onChange={ev => props.updateState('password', ev)}
                type={props.showPW ? 'text' : 'password'}
              />
              <button
                type="button"
                className="hvrBgGrey1 trans1"
                onClick={props.togglePWVisibility}>
                <span
                  role="img"
                  className="mR1"
                  aria-label="Eye Emoji">
                  👁️
                </span>
                Reveal
              </button>
            </div>
            {!props.error && !props.password && (
              <small>
                Password must be at least 12 characters long. We recommend using a password manager to generate a randomized password or passphrase
              </small>
            )}
            {!props.error && props.password && (
              <div>
                <span
                  className="br8 dBl bgGreen p1"
                  style={{
                    maxWidth: '100%',
                    width: `${props.password.length * 8}%`,
                  }}
                />
              </div>
            )}
            {props.error && (
              <span className="fs6 fw600 red">
                {props.error}
              </span>
            )}
          </div>
          <input
            autoComplete="off"
            className="p3 brdA1 dBl mB2"
            placeholder="Username"
            value={props.username}
            onChange={ev => props.updateState('username', ev)}
          />
          <input
            autoComplete="off"
            className="p3 brdA1 dBl mB2"
            placeholder="First name"
            value={props.fname}
            onChange={ev => props.updateState('fname', ev)}
          />
          <input
            autoComplete="off"
            className="p3 brdA1 dBl"
            placeholder="Last name"
            value={props.lname}
            onChange={ev => props.updateState('lname', ev)}
          />
        </div>
        <button className="p3 pL4 pR4 hvrBgGrey1 trans1">
          Sign up
        </button>
      </fieldset>
    </form>
  </div>
));
