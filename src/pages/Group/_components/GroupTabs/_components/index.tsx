import cx from 'classnames';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

export const Tab = memo((props: tProps) => {
  const routeDisplayMap = {
    '': props.isDesktop ? 'Upcoming Meetings' : 'Meetings',
    planMeeting: props.isDesktop ? 'Plan Meeting' : 'Plan',
    drafts: props.isDesktop ? 'Meeting Drafts' : 'Drafts',
    meetings: props.isDesktop ? 'Upcoming Meetings' : 'Meetings',
    pending: props.isDesktop ? 'Pending Approvals' : 'Pending',
    members: props.isDesktop ? 'Current Members' : 'Members',
  };

  const { match, subRoute } = props;
  const { idOrSlug, section } = match.params;
  const route = `/${subRoute}`;
  const to = `/group/${idOrSlug}${subRoute ? route : ''}`;
  const text = routeDisplayMap[subRoute];
  const isMeetings = subRoute === '' && typeof section === 'undefined';
  const isActive = isMeetings || section === subRoute;
  const className = cx({
    'd:mr-2 text-gray-5': true,
    'd:ml-2': ['', 'members'].indexOf(subRoute) === -1,
    'text-base d:text-3': isActive,
    'no-underline': !isActive,
  });

  // dont render link if you're on the section page itself
  if (isMeetings || section === subRoute) {
    return (
      <h2 className={className}>
        {text}
      </h2>
    );
  }

  return (
    <Link
      to={to}
      className={className}>
      {text}
    </Link>
  );
});
