import React, { memo } from 'react';
import { Link } from 'react-router-dom';

export const Tab = memo((props: any) => {
  const { match, text, subRoute = '' } = props;
  const { country, city, organization } = match.params;

  const to = `${country}/${city}/${organization}${subRoute}`;

  // if (subRoute === route) {
  //   return (
  //     <span className="capitalize dBl bgBlue white p3">
  //       {text.replace('/', '')}
  //     </span>
  //   );
  // }

  return (
    <Link to={subRoute} className="capitalize dBl p3">
      {text}
    </Link>
  );
});
