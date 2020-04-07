import cx from 'classnames';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

const routeDisplayMap = {
  '': 'Upcoming Meetings',
  planMeeting: 'Plan Meeting',
  drafts: 'Event Drafts',
  events: 'Upcoming Meetings',
  pending: 'Pending Members',
};

export const Tab = memo((props: tProps) => {
  const { match, subRoute } = props;
  const { idOrSlug, section } = match.params;
  const route = `/${subRoute}`;
  const to = `/org/${idOrSlug}${subRoute ? route : ''}`;
  // @ts-ignore
  const text = routeDisplayMap[subRoute];
  const isMeetings = subRoute === '' && typeof section === 'undefined';
  const isActive = isMeetings || section === subRoute;
  const className = cx({
    'mr-2': true,
    'ml-2': subRoute !== '',
    'text-3 text-gray-5': isActive,
    'no-underline text-gray-4': !isActive,
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
