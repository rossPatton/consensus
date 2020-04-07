import React, {memo} from 'react';

import {PasswordInput} from '../../../../../components';
import {tComponentProps} from './_types';

export const DeleteAccountComponent = memo((props: tComponentProps) => (
  <form
    autoComplete="off"
    action="/api/v1/account"
    onSubmit={props.deleteAccount}>
    <fieldset>
      <legend>
        <h1 className="text-2">
          Delete your account
        </h1>
      </legend>
      <h2 className="text-3 mb-3 text-gray-4">
        Enter your login credentials to trigger the account deletion process. If you do this, your account will be <b>permanently</b> deleted!
      </h2>
      <PasswordInput
        id="pwInput"
        title="Current password"
        password={props.currentPassword}
        placeholder="Your current password"
        onChange={ev => props.updateState('currentPassword', ev)}
      />
    </fieldset>
    <button
      disabled={props.isClient && !props.currentPassword}
      className="p-2 pl-3 pr-3 hover:bg-gray-3">
      Yes, really delete my account
    </button>
  </form>
));
