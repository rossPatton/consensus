import React, {memo} from 'react';

import {Emoji} from '~app/components';

import {tComponentProps} from './_types';

export const InvitationsComponent = memo((props: tComponentProps) => (
  <>
    <h3 className="font-bold">Active Invitations</h3>
    <p className="mb-3">
      Any groups that want you to join will be listed below.
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
            Reject Invitation
          </button>
          <h3 className="text-base">
            <span className="font-semibold">{invite?.group?.name}</span> invites you to join as a <span className="font-semibold">{invite.type}</span>
          </h3>
        </li>
      ))}
    </ul>
  </>
));
