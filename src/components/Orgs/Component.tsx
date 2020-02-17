import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

export const OrgsComponent = memo((props: tProps) => (
  <ul className="fx fxWrap">
    {props.orgs.map((org: tOrg, i) => (
      <li
        key={i}
        className="col fxg0 third mB3">
        <Link
          to={`/org/${org.id}`}
          className="fs6 lh1 noUnderline">
          {org.category}
          <h2 className="dBl lh1 fs3 mT1 mB3 underline">
            {org.name}
          </h2>
          <div>
            Based in {org.city}
          </div>
        </Link>
      </li>
    ))}
  </ul>
));
