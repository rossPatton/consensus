import { useParams } from '@remix-run/react';
import { Groups } from '@prisma/client';
import { Tab } from './_components';

export const GroupTabs = (props: { group: Groups }) => {
  // const context = useContext(MediaContext);
  // const { group } = props;
  const isMod = true;// role === 'admin' || role === 'facilitator';
  const isAtLeastAMember = true;// !!role;

  return (
    <nav className="d:pl-2 d:pr-2 d:pt-2 mb-1 d:mb-2 overflow-scroll">
      <ul className="flex items-baseline whitespace-no-wrap space-x-2">
        <li>
          <Tab
            text="Meetings"
            to="meetings"
          />
        </li>
        {isAtLeastAMember && (
          <li>
            <Tab
              text="Members"
              to="members"
            />
          </li>
        )}
        {isMod
          && (
            <li>
              <Tab
                text="Pending Members"
                to="pending"
              />
            </li>
          )}
        {isMod
          && (
            <li>
              <Tab
                text="Drafts"
                to="drafts"
              />
            </li>
          )}
        {isMod
          && (
            <li>
              <Tab
                text="Plan Meeting"
                to="new_meeting"
              />
            </li>
          )}
      </ul>
    </nav>
  );
};
