import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

export const Tab = memo((props: tProps) => {
  const { match, role, subRoute = '' } = props;
  const { country, city, id, region, slug, section } = match.params;
  const to = id
    ? `/org/${id}/${subRoute}`
    : `/org/${country}/${region}/${city}/${slug}/${subRoute}`;

  const isPublicSection = subRoute !== 'decisions';

  // if user not logged in, we want to show all org options, but dont make clickable
  let cx = 'ttCap dBl p2 pL3 pR3';
  if (!role && !isPublicSection) cx += ' o5';
  // if locked section, or if you're on the section page itself
  if ((!role && !isPublicSection) || section === subRoute) {
    return (
      <span className={`${cx} bgGrey2`}>
        {subRoute}
      </span>
    );
  }

  return (
    <Link
      to={to}
      className={`${cx} hvrBgGrey3 trans1`}>
      {subRoute}
    </Link>
  );
});
