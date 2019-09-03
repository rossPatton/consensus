import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

export const MembershipsComponent = memo((props: tProps) => {
  return (
    <ul>
      {props.orgs.map((org: tOrg, i) => (
        <li
          key={i}
          className="p3 brdA1 br8 mB3">
          <h2 className="fs3 ttCap">
            <Link to={org.slug}>
              {org.name}
            </Link>
          </h2>
        </li>
      ))}
    </ul>
  );
});
