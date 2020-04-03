import React, {memo} from 'react';

import {PasswordInput} from '../../../../../components';
import {tComponentProps} from './_types';

export const DeleteGroupComponent = memo((props: tComponentProps) => (
  <form
    autoComplete="off"
    className="bg-white br8 p-3"
    action="/api/v1/account"
    onSubmit={props.deleteGroup}>
    <fieldset>
      <legend>
        <h1 className="fs3">
          {props.session.deletionDeadline
            ? 'Cancel group deletion'
            : 'Delete group'}
        </h1>
      </legend>
      <h2 className="fs5 mb-3 copyBlack">
        {props.session.deletionDeadline
          ? 'Enter your password again to cancel the account deletion process.'
          : <>Enter your password to trigger the account deletion process. You will have 1 week to stop it. The group will continue as normal during this time. After 1 week, your group will be <b>permanently</b> deleted.</>}
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
      className="p-3 pl-4 pR4 hover:bg-gray-11">
      {props.session.deletionDeadline
        ? 'Cancel group deletion'
        : 'Yes, really delete the group'}
    </button>
  </form>
));
