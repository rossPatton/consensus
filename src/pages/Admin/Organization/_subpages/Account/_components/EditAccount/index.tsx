import React, {memo} from 'react';

import {PasswordInput} from '../../../../../../../components';
// import {tComponentProps} from './_types';

const EditAccount = memo((props: any) => (
  <form
    action="/api/v1/user"
    autoComplete="off"
    onSubmit={props.save}>
    <fieldset>
      <legend>
        <h1 className="fs3 mB3">Edit your account</h1>
      </legend>
      <div className="mB4">
        <label htmlFor="login">
          <h2 className="fs5 mB1 lh1">
            Change Login
          </h2>
          <p className="fs5 copyBlack mB1">
            A unique username that is used just for logging in. Keep secret.
          </p>
          <input
            id="login"
            autoComplete="off"
            onChange={ev => props.updateState('login', ev)}
            className="p3 mB3 row"
            placeholder="yourNewSecretLogin"
            value={props.login}
            name="login"
          />
        </label>
        <label className="row mB3" htmlFor="email">
          <h2 className="fs5 mB1 lh1">
            Change Email address
          </h2>
          <p className="fs5 copyBlack mB1">
            Used for account verification, event reminders, etc.
          </p>
          <input
            onChange={ev => props.updateState('email', ev)}
            className="p3 row"
            autoComplete="off"
            placeholder="yourNewEmail@example.com"
            value={props.email}
            name="email"
          />
        </label>
        {/* <div
          tabIndex={0}
          role="button"
          className="fx aiCtr curPtr mB3 fs6"
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
        </div> */}
        <PasswordInput
          newPassword
          id="newPwInput"
          name="newPassword"
          title="Change password"
          password={props.newPassword}
          placeholder="example: a_very_long_and_safe_passphrase"
          onChange={ev => props.updateState('newPassword', ev)}
        />
      </div>
      <PasswordInput
        id="pwInput"
        onChange={ev => props.updateState('currentPassword', ev)}
        password={props.currentPassword}
        placeholder=""
        title="Current password"
      />
    </fieldset>
    <div className="fx aiCtr">
      <button
        disabled={!props.currentPassword}
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
));

export default EditAccount;