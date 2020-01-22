import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

export const Tab = memo((props: tProps) => {
  const { match, subRoute = '' } = props;
  const { id, section } = match.params;
  const to = `/org/${id}/${subRoute}`;
  const cx = 'ttCap dBl p2 pL3 pR3';

  // dont render link if you're on the section page itself
  if (section === subRoute) {
    return (
      <span className={`${cx} bgGrey2`}>
        {subRoute === 'events' ? 'meetings' : subRoute}
      </span>
    );
  }

  return (
    <Link
      to={to}
      className={`${cx} hvrBgGrey3 trans1`}>
      {subRoute === 'events' ? 'meetings' : subRoute}
    </Link>
  );
});
