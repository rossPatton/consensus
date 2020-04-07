import React, {memo} from 'react';

import {PasswordInput} from '../../../../../components';
import {tComponentProps} from './_types';

export const DeleteGroupComponent = memo((props: tComponentProps) => (
  <form
    autoComplete="off"
    className="bg-white rounded p-2"
    action="/api/v1/account"
    onSubmit={props.deleteGroup}>
    <fieldset>
      <legend>
        <h1 className="text-3">
          {props.session.deletionDeadline
            ? 'Cancel group deletion'
            : 'Delete group'}
        </h1>
      </legend>
      <h2 className="text-base mb-2 text-gray-5">
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
      className="p-2 pl-3 pr-3 hover:bg-gray-1">
      {props.session.deletionDeadline
        ? 'Cancel group deletion'
        : 'Yes, really delete the group'}
    </button>
  </form>
));
