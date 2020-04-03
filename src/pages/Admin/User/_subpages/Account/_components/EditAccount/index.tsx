import React, {memo} from 'react';
import {Link} from 'react-router-dom';

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
        <h1 className="fs3 mb-3">Edit your account</h1>
      </legend>
      <div className="mB5">
        <label htmlFor="newLogin">
          <h2 className="fs5 mb-1 leading-none">
            Change login
          </h2>
          <p className="fs5 copyBlack mb-1">
            A secret username that is used just for logging in. Must be unique.
          </p>
          <input
            autoComplete="nope"
            className="p-3 mb-4 w-full"
            onChange={ev => props.updateState('login', ev.currentTarget.value)}
            placeholder="a_Secret_Name_Nobody_Can_Guess"
            value={props.login}
            name="newLogin"
          />
        </label>
        <label className="w-full mb-1" htmlFor="newEmail">
          <h2 className="fs5 mb-1 leading-none">
            Change email address
          </h2>
          <p className="fs5 copyBlack mb-1">
            Used for account verification.
          </p>
          <input
            autoComplete="nope"
            onChange={ev => props.updateState('email', ev.currentTarget.value)}
            className="p-3 w-full"
            placeholder="yournewemail@example.com"
            value={props.email}
            name="newEmail"
          />
        </label>
        <div
          tabIndex={0}
          role="button"
          className="curPtr leading-none mb-4 text-sm ba0"
          onClick={() => props.updateState('privateEmail', !props.privateEmail)}
          onKeyPress={() => props.updateState('privateEmail', !props.privateEmail)}>
          <input
            readOnly
            type="checkbox"
            className="mr-2"
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
    <div className="flex flex-col d:flex-row items-center">
      <button
        disabled={!props.currentPassword}
        className="p-3 pl-4 pR4 mr-2 hover:bg-gray-11 trans1">
        Save Changes
      </button>
      <Link
        to="/admin/account"
        className="btn p-3 pl-4 pR4 hover:bg-gray-11 trans1">
        Go back
      </Link>
    </div>
  </form>
));

export default EditAccount;
