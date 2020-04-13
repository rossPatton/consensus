import React from 'react';

import {Tab} from './_components';
import {tProps} from './_types';
import {MediaContext} from '../../../../context/MatchMediaProvider/_context';

class OrganizationTabs extends React.PureComponent<tProps> {
  static contextType = MediaContext;

  render() {
    const { match, role } = this.props;
    const isMod = role === 'admin' || role === 'facilitator';
    const { section } = match.params;

    return (
      <nav className="mb-1 d:mb-2 overflow-scroll">
        <ul className="flex items-center justify-evenly whitespace-no-wrap">
          {section === 'members' && (
            <li>
              <Tab
                {...this.context}
                match={match}
                subRoute="members"
              />
            </li>
          )}
          <li>
            <Tab
              {...this.context}
              match={match}
              subRoute=""
            />
          </li>
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
