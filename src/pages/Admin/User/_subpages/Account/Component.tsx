import React, {memo} from 'react';

import {PasswordInput} from '../../../../../components';
import {tComponentProps} from './_types';

export const AccountComponent = memo((props: tComponentProps) => {
  const {login: origLogin} = props.session;

  return (
    <form
      action="/api/v1/user"
      autoComplete="off"
      className="rel"
      encType="multipart/form-data"
      onSubmit={props.save}>
      <fieldset>
        {props.session.isVerified && (
          <div className="fx aiCtr mB1 fs7 abs t r">
            <span className="mR1">✔</span>
            Verified Account
          </div>
        )}
        <legend>
          <h1 className="fs3 mB3">Manage your account</h1>
        </legend>
        <div className="mB4">
          <label htmlFor="login">
            <h2 className="ffLab fs5 mB1 lh1">
              Change your Login
            </h2>
            <p className="fs5 copyBlack mB1">
              A unique name that is used just for logging in. Keep secret.
            </p>
            <input
              id="login"
              onChange={ev => props.updateState('login', ev)}
              className="p3 mB3 row"
              placeholder={origLogin}
              value={props.login}
              name="login"
            />
          </label>
          <PasswordInput
            newPassword
            id="newPwInput"
            name="newPassword"
            title="Change your password"
            password={props.newPassword}
            placeholder="Your new password"
            onChange={ev => props.updateState('newPassword', ev)}
          />
        </div>
        <PasswordInput
          id="pwInput"
          title="Current password"
          password={props.password}
          placeholder="Your current password"
          onChange={ev => props.updateState('password', ev)}
        />
      </fieldset>
      <button
        disabled={!props.password}
        className="p3 pL4 pR4 hvrBgGrey1 trans1">
        Save Changes
      </button>
    </form>
  );
});
