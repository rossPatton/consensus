import React, {memo} from 'react';

import {Form} from '~app/components';

import {tComponentProps} from './_types';

export const DeleteGroupComponent = memo((props: tComponentProps) => (
  <Form
    autoComplete="off"
    onSubmit={props.deleteGroup}
    name="deleteGroupForm"
    className="rounded d:border d:shadow d:p-2"
    legend={<h1 className="text-2">Delete group</h1>}
    renderFields={() => (
      <h2 className="text-3 mb-3 text-gray-5">
        Are you sure you want to delete your group?
      </h2>
    )}
    renderSubmit={formProps => (
      <button
        disabled={!formProps.hasMounted}
        className="p-2 pl-3 pr-3 hover:bg-gray-3">
        Yes, really delete the group
      </button>
    )}
  />
));
