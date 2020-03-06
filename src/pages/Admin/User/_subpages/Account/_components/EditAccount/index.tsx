import React, {memo} from 'react';

import {PasswordInput} from '../../../../../../../components';
// import {tComponentProps} from './_types';

const EditAccount = memo((props: any) => {
  const {login: origLogin} = props.session;

  return (
    <form
      action="/api/v1/user"
      autoComplete="off"
      className="rel"
      encType="multipart/form-data"
      onSubmit={props.save}>
      <fieldset>
        <legend>
          <h1 className="fs3 mB3">Edit your account</h1>
        </legend>
        <div className="mB5">
          <label htmlFor="login">
            <h2 className="ffLab fs5 mB1 lh1">
              New Login
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
          <label className="row mB3" htmlFor="email">
            <h2 className="ffLab fs5 mB1 lh1">
              Email address
            </h2>
            <p className="fs5 copyBlack mB1">
              Used for account verification, event reminders, etc.
            </p>
            <input
              onChange={ev => props.updateState('email', ev)}
              className="p3 row"
              placeholder="Update your email here"
              value={props.email}
              name="email"
            />
          </label>
          <div
            tabIndex={0}
            role="button"
            className="fx aiCtr curPtr mB4 fs6"
            onClick={ev => props.updateState('privateEmail', ev)}
            onKeyPress={ev => props.updateState('privateEmail', ev)}>
            <input
              readOnly
              type="checkbox"
              className="mR2"
              autoComplete="nope"
              checked={props.privateEmail}
            />
            <span>
              {props.privateEmail && 'Your email is kept private'}
              {!props.privateEmail && 'Your email is displayed on your profile.'}
            </span>
          </div>
          <PasswordInput
            newPassword
            id="newPwInput"
            name="newPassword"
            title="New password"
            password={props.newPassword}
            placeholder="example: a_very_long_and_safe_passphrase"
            onChange={ev => props.updateState('newPassword', ev)}
          />
        </div>
        <PasswordInput
          id="pwInput"
          title="Current password"
          password={props.password}
          placeholder=""
          onChange={ev => props.updateState('password', ev)}
        />
      </fieldset>
      <div className="fx aiCtr">
        <button
          disabled={!props.password}
          className="p3 pL4 pR4 mR2 hvrBgGrey1 trans1">
          Save Changes
        </button>
        <button
          onClick={props.toggleLock}
          className="p3 pL4 pR4 hvrBgGrey1 trans1">
          Go back
        </button>
      </div>
    </form>
  );
});

export default EditAccount;
