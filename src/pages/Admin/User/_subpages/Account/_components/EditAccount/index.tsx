import React, {memo} from 'react';

import {tComponentProps} from '../../_types';
import {PasswordInput} from '../../../../../../../components';

const EditAccount = memo((props: tComponentProps) => (
  <form
    action="/api/v1/user"
    autoComplete="off"
    className="rel"
    onSubmit={props.save}>
    <fieldset>
      <legend>
        <h1 className="fs3 mB3">Edit your account</h1>
      </legend>
      <div className="mB5">
        <label htmlFor="newLogin">
          <h2 className="fs5 mB1 lh1">
            Change login
          </h2>
          <p className="fs5 copyBlack mB1">
            A secret username that is used just for logging in. Must be unique.
          </p>
          <input
            autoComplete="nope"
            className="p3 mB4 row"
            onChange={ev => props.updateState('login', ev.currentTarget.value)}
            placeholder="a_Secret_Name_Nobody_Can_Guess"
            value={props.login}
            name="newLogin"
          />
        </label>
        <label className="row mB1" htmlFor="newEmail">
          <h2 className="fs5 mB1 lh1">
            Change email address
          </h2>
          <p className="fs5 copyBlack mB1">
            Used for account verification, event reminders, etc.
          </p>
          <input
            autoComplete="nope"
            onChange={ev => props.updateState('email', ev.currentTarget.value)}
            className="p3 row"
            placeholder="yournewemail@example.com"
            value={props.email}
            name="newEmail"
          />
        </label>
        <div
          tabIndex={0}
          role="button"
          className="curPtr lh1 mB4 fs6 ba0"
          onClick={() => props.updateState('privateEmail', !props.privateEmail)}
          onKeyPress={() => props.updateState('privateEmail', !props.privateEmail)}>
          <input
            readOnly
            type="checkbox"
            className="mR2"
            autoComplete="nope"
            checked={props.privateEmail}
          />
          <span>
            {props.privateEmail && 'Your email is kept private'}
            {!props.privateEmail && 'Your email is visible on your public profile.'}
          </span>
        </div>
        <PasswordInput
          newPassword
          id="newPwInput"
          name="newPassword"
          title="Change password"
          password={props.newPassword}
          placeholder="example: a_very_long_and_safe_passphrase"
          onChange={ev => props.updateState('newPassword', ev.currentTarget.value)}
        />
      </div>
      <PasswordInput
        id="pwInput"
        onChange={ev => props.updateState('currentPassword', ev.currentTarget.value)}
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
