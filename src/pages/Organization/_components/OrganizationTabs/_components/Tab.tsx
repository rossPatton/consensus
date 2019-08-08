import React, { memo } from 'react';
import { Link } from 'react-router-dom';

export const Tab = memo((props: any) => {
  const { match, subRoute = '' } = props;
  const { country, city, state, org, section } = match.params;

  const to = `/${country}/${state}/${city}/${org}/${subRoute}`;

  if (section === subRoute) {
    return (
      <span className="cap dBl bgBlue white p3">
        {subRoute}
      </span>
    );
  }

  return (
    <Link to={to} className="cap dBl p3">
      {subRoute}
    </Link>
  );
});
