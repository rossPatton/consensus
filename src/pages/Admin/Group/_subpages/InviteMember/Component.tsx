import React, {memo} from 'react';

import {Emoji} from '~app/components';
import {GenericLoader} from '~app/containers';

import {tComponentProps} from './_types';

export const InviteMemberComponent = memo((props: tComponentProps) => (
  <>
    <form
      autoComplete="off"
      className="rounded d:border d:shadow d:p-2 mb-3"
      action="/api/v1/invites"
      onSubmit={props.submit}>
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
        onClick={props.submit}
        disabled={props.hasMounted && !props.username}
        className="inline-block p-2 pl-3 pr-3 hover:bg-gray-3">
        Send Invitation
      </button>
    </form>
    <GenericLoader
      isLoading={props.invitesThunk.isLoading}
      render={() => (
        <div className="rounded d:border d:shadow d:p-2">
          <h3 className="font-bold">Active Invitations</h3>
          <p>
            All the people you&apos;ve extended an invite to who haven&apos;t responded yet.
          </p>
          <ul>
            {props.invitesThunk.data.map((invite, i) => (
              <li className="flex flex-row items-center p-2 mb-1 border rounded" key={i}>
                <button
                  className="flex items-center border-0 bg-0 mr-2"
                  onClick={ev => props.deleteInvite(ev, invite)}>
                  <Emoji
                    label="Big Red X Emoji"
                    emoji="❌"
                  />
                  Cancel
                </button>
                <h3 className="text-base font-semibold">
                  @{invite?.user?.username} as {invite.type}
                </h3>
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  </>
));
