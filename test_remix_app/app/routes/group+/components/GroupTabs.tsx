import { NavLink, useParams } from '@remix-run/react';
import { Groups } from '@prisma/client';
import { JoinForm } from './JoinForm';
import { LeaveForm } from './LeaveForm';

export const GroupTabs = (props: { group: Groups }) => {
  const { group } = props;
  const params = useParams();
  const isMod = true;// role === 'admin' || role === 'facilitator';
  const isAtLeastAMember = true;// !!role;

  return (
    <nav className="grid grid-cols-12">
      <ul className="flex items-baseline whitespace-nowrap space-x-2 col-span-9">
        <li>
          <NavLink
            to={`${params.groupId}`}
            className={({ isActive }) => isActive ? "font-bold no-underline" : ""}
            relative="path">
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${params.groupId}/media`}
            className={({ isActive }) => isActive ? "font-bold no-underline" : ""}
            relative="path">
            Media
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${params.groupId}/meetings`}
            className={({ isActive }) => isActive ? "font-bold no-underline" : ""}
            relative="path">
            Meetings
          </NavLink>
        </li>
        {isAtLeastAMember && (
          <li>
            <NavLink
              to={`${params.groupId}/members`}
              className={({ isActive }) => isActive ? "font-bold no-underline" : ""}
              relative="path">
              Members
            </NavLink>
          </li>
        )}
        {isAtLeastAMember && (
          <li>
            <NavLink
              to={`${params.groupId}/members`}
              className={({ isActive }) => isActive ? "font-bold no-underline" : ""}
              relative="path">
              Votes
            </NavLink>
          </li>
        )}
        {isMod
          && (
            <li>
              <NavLink
                to={`${params.groupId}/new_meeting`}
                className={({ isActive }) => isActive ? "font-bold no-underline" : ""}
                relative="path">
                New Meeting
              </NavLink>
            </li>
          )}
      </ul>
      <ul className='col-span-3 flex justify-end'>
        <li>
          <JoinForm role="" />
        </li>
        <li>
          <LeaveForm group={group} role="" />
        </li>
      </ul>
    </nav>
  );
};
