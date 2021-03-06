import cx from 'classnames';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Emoji} from '~app/components';

import {tComponentProps} from './_types';

export const InvitationsComponent = memo((props: tComponentProps) => (
  <>
    <h2 className="font-semibold">
      Active Invitations
    </h2>
    <p
      className={cx({
        'mb-3': props.invitesThunk.data.length > 0,
      })}>
      Any groups that want you to join will be listed below.
    </p>
    <ul>
      {props.invitesThunk.data.map((invite, i) => (
        <li className="flex items-center p-2 mb-1 border rounded" key={i}>
          <button
            className="flex items-center border-0 bg-0 mr-2"
            onClick={ev => props.deleteInvite(ev, invite)}>
            <Emoji
              className="mr-1"
              label="Big Red X Emoji"
              emoji="❌"
            />
            Reject
          </button>
          <button
            className="flex items-center border-0 bg-0 mr-2"
            onClick={ev => props.acceptInvite(ev, invite)}>
            <Emoji
              className="mr-1"
              label="Accept Invitation Checkbox"
              emoji="✅"
            />
            Accept
          </button>
          <h3 className="text-base">
            <Link to={`/group/${invite?.group?.handle}`} className="font-semibold">{invite?.group?.name}</Link> invites you to join as a <span className="font-semibold">{invite.type}</span>
          </h3>
        </li>
      ))}
    </ul>
  </>
));
