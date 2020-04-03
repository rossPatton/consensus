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
  const { id, section } = match.params;
  const route = `/${subRoute}`;
  const to = `/org/${id}${subRoute ? route : ''}`;
  // @ts-ignore
  const text = routeDisplayMap[subRoute];
  const isMeetings = subRoute === '' && typeof section === 'undefined';
  const isActive = isMeetings || section === subRoute;
  const className = cx({
    'fs3 capitalize dBl p-2 pr-3': true,
    'pl-3': subRoute !== '',
    'underline black': isActive,
    'no-underline grey3': !isActive,
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
