import React, {memo} from 'react';

// import {PasswordInput} from '~app/components';
import {tComponentProps} from './_types';

export const InviteMemberComponent = memo((props: tComponentProps) => (
  <form
    autoComplete="off"
    className="rounded d:border d:shadow d:p-2"
    action="/api/v1/invite"
    onSubmit={() => {}}>
    <fieldset>
      <legend>
        <h2 className="text-3 font-bold">
          Manual Invite
        </h2>
      </legend>
      <p className="mb-3 text-gray-5">
        Search for a user by username to extend a group invitation. If you are a hidden group, this is the <b>only</b> way a person can join.
      </p>
      <label className="w-full mb-2" htmlFor="username">
        <h2 className="text-base mb-1 leading-none font-semibold">
          Enter username
        </h2>
        <input
          autoComplete="off"
          onChange={ev => props.updateState('username', ev)}
          className="p-2 w-full"
          placeholder="usernameOfPersonToInvite"
          value={props.username}
          name="username"
        />
      </label>
    </fieldset>
    <button
      disabled={props.hasMounted && !props.username}
      className="inline-block p-2 pl-3 pr-3 hover:bg-gray-3">
      Send Invitation
    </button>
    {/* TODO render list of pending invitations here */}
  </form>
));
