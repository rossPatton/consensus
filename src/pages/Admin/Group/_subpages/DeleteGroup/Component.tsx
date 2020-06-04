import React, {memo} from 'react';

import {Form} from '~app/components';

import {tComponentProps} from './_types';

export const DeleteGroupComponent = memo((props: tComponentProps) => (
  <Form
    autoComplete="off"
    onSubmit={props.deleteGroup}
    name="deleteGroupForm"
    className="rounded d:border d:shadow d:p-2"
    legend={<h1 className="text-2">
      {props.session.deletionDeadline
        ? 'Cancel group deletion'
        : 'Delete group'}
    </h1>}
    renderFields={() => (
      <h2 className="text-3 mb-3 text-gray-5">
        {props.session.deletionDeadline
          ? 'Enter your password again to cancel the account deletion process.'
          : <>Enter your password to trigger the account deletion process. You will have 1 week to stop it. The group will continue as normal during this time. After 1 week, your group will be <b>permanently</b> deleted.</>}
      </h2>
    )}
    renderSubmit={formProps => (
      <button
        disabled={!formProps.hasMounted}
        className="p-2 pl-3 pr-3 hover:bg-gray-3">
        {props.session.deletionDeadline
          ? 'Cancel group deletion'
          : 'Yes, really delete the group'}
      </button>
    )}
  />
));
