// import { useContext } from 'react';
// import { MediaContext } from '~/context';
import { Tab } from './_components';

export const GroupTabs = () => {
  // const context = useContext(MediaContext);
  // const { match, role } = props;
  const isMod = true;// role === 'admin' || role === 'facilitator';
  const isAtLeastAMember = true;// !!role;

  return (
    <nav className="d:pl-2 d:pr-2 d:pt-2 mb-1 d:mb-2 overflow-scroll">
      <ul className="flex items-baseline whitespace-no-wrap">
        <li>
          <Tab
            text="Meetings"
          // {...context}
          // match={match}
          // subRoute=""
          />
        </li>
        {isAtLeastAMember && (
          <li>
            <Tab
              text="Members"
            />
          </li>
        )}
        {isMod
          && (
            <li>
              <Tab
                text="Pending Members"
              />
            </li>
          )}
        {isMod
          && (
            <li>
              <Tab
                text="Drafts"
              />
            </li>
          )}
        {isMod
          && (
            <li>
              <Tab
                text="Plan Meeting"
              />
            </li>
          )}
      </ul>
    </nav>
  );
};
