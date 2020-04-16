import {MediaContext} from '@app/context/MatchMediaProvider/_context';
import cx from 'classnames';
import React from 'react';

import {Tab} from './_components';
import {tProps} from './_types';

class OrganizationTabs extends React.PureComponent<tProps> {
  static contextType = MediaContext;

  render() {
    const { match, role } = this.props;
    const isMod = role === 'admin' || role === 'facilitator';
    const isAtLeastAMember = !!role;

    return (
      <nav className="mb-1 d:mb-2 overflow-scroll">
        <ul
          className={cx({
            'flex items-center whitespace-no-wrap': true,
            'justify-evenly': isMod,
          })}>
          <li>
            <Tab
              {...this.context}
              match={match}
              subRoute=""
            />
          </li>
          {isAtLeastAMember && (
            <li>
              <Tab
                {...this.context}
                match={match}
                subRoute="members"
              />
            </li>
          )}
          {isMod
            && (
              <li>
                <Tab
                  {...this.context}
                  match={match}
                  subRoute="pending"
                />
              </li>
            )}
          {isMod
            && (
              <li>
                <Tab
                  {...this.context}
                  match={match}
                  subRoute="drafts"
                />
              </li>
            )}
          {isMod
            && (
              <li>
                <Tab
                  {...this.context}
                  match={match}
                  subRoute="planMeeting"
                />
              </li>
            )}
        </ul>
      </nav>
    );
  }
}

export default OrganizationTabs;
