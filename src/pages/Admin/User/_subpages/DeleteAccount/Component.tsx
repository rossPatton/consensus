import React, {memo} from 'react';

import {Form} from '~app/components';

import {tComponentProps} from './_types';

export const DeleteAccountComponent = memo((props: tComponentProps) => (
  <Form
    className="w-full"
    error={props.error}
    name="deleteAccount"
    legend={(<h2 className="font-semibold">Delete your account</h2>)}
    onSubmit={props.deleteUser}
    renderFields={() => (
      <>
        <h2 className="text-3 mb-3 text-gray-5">
          Are you sure you want to delete your account?
        </h2>
      </>
    )}
    renderSubmit={formProps => (
      <button
        disabled={!formProps.hasMounted}
        className="p-2 pl-3 pr-3 hover:bg-gray-3">
        Yes, really delete my account
      </button>
    )}
  />
));
