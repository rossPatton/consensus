import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

export const Tab = memo((props: tProps) => {
  const { match, subRoute = '' } = props;
  const { country, city, region, org, section } = match.params;
  const to = `/${country}/${region}/${city}/${org}/${subRoute}`;
  const cx = 'ttCap dBl p2 pL3 pR3';

  if (section === subRoute) {
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
