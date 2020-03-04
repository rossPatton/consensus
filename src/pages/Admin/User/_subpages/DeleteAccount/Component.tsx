import React, {memo} from 'react';

import {PasswordInput} from '../../../../../components';
import {tComponentProps} from './_types';

export const DeleteAccountComponent = memo((props: tComponentProps) => (
  <form
    action="/api/v1/account"
    autoComplete="off"
    onSubmit={props.deleteAccount}>
    <fieldset>
      <legend>
        <h1 className="fs3 mB3">Delete your account</h1>
      </legend>
      <h2 className="fs4 mB3">
        Enter your login credentials to trigger the account deletion process. You will have 2 weeks to stop the deletion. You can use the account as normal during this time. After 2 weeks, your account will be <b>permanently</b> deleted.
      </h2>
      <label htmlFor="login">
        <h2 className="ffLab fs5 mB1 lh1">
          Login
        </h2>
        <input
          id="login"
          onChange={ev => props.updateState('login', ev)}
          className="p3 mB3 row"
          placeholder=""
          value={props.login}
          name="login"
        />
      </label>
      <PasswordInput
        id="pwInput"
        title="Current password"
        password={props.password}
        placeholder="Your current password"
        onChange={ev => props.updateState('password', ev)}
      />
    </fieldset>
    <button
      disabled={props.isClient && (!props.login || !props.password)}
      className="p3 pL4 pR4 hvrBgGrey1 trans1">
      Yes, really delete my account
    </button>
  </form>
));
