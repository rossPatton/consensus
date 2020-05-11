import cx from 'classnames';
import React, {memo, useContext} from 'react';

import {MediaContext} from '~app/context/MatchMediaProvider/_context';

import {Tab} from './_components';
import {tProps} from './_types';

const GroupTabs = memo((props: tProps) => {
  const context = useContext(MediaContext);
  const { match, role } = props;
  const isMod = role === 'admin' || role === 'facilitator';
  const isAtLeastAMember = !!role;

  return (
    <nav className="d:pl-2 d:pr-2 d:pt-2 mb-1 d:mb-2 overflow-scroll">
      <ul
        className={cx({
          'flex items-center whitespace-no-wrap': true,
          'justify-evenly': isMod,
        })}>
        <li>
          <Tab
            {...context}
            match={match}
            subRoute=""
          />
        </li>
        {isAtLeastAMember && (
          <li>
            <Tab
              {...context}
              match={match}
              subRoute="members"
            />
          </li>
        )}
        {isMod
          && (
            <li>
              <Tab
                {...context}
                match={match}
                subRoute="pending"
              />
            </li>
          )}
        {isMod
          && (
            <li>
              <Tab
                {...context}
                match={match}
                subRoute="drafts"
              />
            </li>
          )}
        {isMod
          && (
            <li>
              <Tab
                {...context}
                match={match}
                subRoute="planMeeting"
              />
            </li>
          )}
      </ul>
    </nav>
  );
});

export default GroupTabs;