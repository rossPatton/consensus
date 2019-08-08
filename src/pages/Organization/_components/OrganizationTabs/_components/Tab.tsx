import React, { memo } from 'react';
import { Link } from 'react-router-dom';

export const Tab = memo((props: any) => {
  const { match, subRoute = '' } = props;
  const { country, city, state, org, section } = match.params;
  const to = `/${country}/${state}/${city}/${org}/${subRoute}`;
  const cx = 'ttCap dBl p2 pL3 pR3';

  if (section === subRoute) {
    return (
      <span className={`${cx} bgGrey2`}>
        {subRoute}
      </span>
    );
  }

  return (
    <Link to={to} className={cx}>
      {subRoute}
    </Link>
  );
});
