import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {PasswordInput} from '~app/components';

import {tComponentProps} from '../../_types';

const EditAccount = memo((props: tComponentProps) => (
  <form
    action="/api/v1/user"
    autoComplete="off"
    onSubmit={props.save}>
    <fieldset>
      <legend>
        <h1 className="text-3 mb-2">Edit your account</h1>
      </legend>
      <div className="mb-4">
        <label htmlFor="login">
          <h2 className="text-base mb-1 leading-none">
            Change Login
          </h2>
          <p className="text-base text-gray-5 mb-1">
            A unique username that is used just for logging in. Keep secret.
          </p>
          <input
            id="login"
            autoComplete="off"
            onChange={ev => props.updateState('login', ev)}
            className="p-2 mb-2 w-full"
            placeholder="yourNewSecretLogin"
            value={props.login}
            name="login"
          />
        </label>
        <label className="w-full mb-2" htmlFor="email">
          <h2 className="text-base mb-1 leading-none">
            Change Email address
          </h2>
          <p className="text-base text-gray-5 mb-1">
            Used for account verification, event reminders, etc.
          </p>
          <input
            onChange={ev => props.updateState('email', ev)}
            className="p-2 w-full"
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
        className="p-2 pl-3 pr-3 mr-2 hover:bg-gray-3 transition">
        Save Changes
      </button>
      <Link
        to="/admin/account"
        className="btn p-2 pl-3 pr-3 hover:bg-gray-3 transition">
        Go back
      </Link>
    </div>
  </form>
));

export default EditAccount;
