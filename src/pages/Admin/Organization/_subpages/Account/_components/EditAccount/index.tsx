import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from '../../_types';
import {PasswordInput} from '../../../../../../../components';

const EditAccount = memo((props: tComponentProps) => (
  <form
    action="/api/v1/user"
    autoComplete="off"
    onSubmit={props.save}>
    <fieldset>
      <legend>
        <h1 className="fs3 mb-3">Edit your account</h1>
      </legend>
      <div className="mb-4">
        <label htmlFor="login">
          <h2 className="fs5 mb-1 leading-none">
            Change Login
          </h2>
          <p className="fs5 copyBlack mb-1">
            A unique username that is used just for logging in. Keep secret.
          </p>
          <input
            id="login"
            autoComplete="off"
            onChange={ev => props.updateState('login', ev)}
            className="p-3 mb-3 w-full"
            placeholder="yourNewSecretLogin"
            value={props.login}
            name="login"
          />
        </label>
        <label className="w-full mb-3" htmlFor="email">
          <h2 className="fs5 mb-1 leading-none">
            Change Email address
          </h2>
          <p className="fs5 copyBlack mb-1">
            Used for account verification, event reminders, etc.
          </p>
          <input
            onChange={ev => props.updateState('email', ev)}
            className="p-3 w-full"
            autoComplete="off"
            placeholder="yourNewEmail@example.com"
            value={props.email}
            name="email"
          />
        </label>
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
