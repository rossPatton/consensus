import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

export const OrgsComponent = memo((props: tProps) => (
  <ul className="fx fxWrap">
    {props.orgs.map((org, i) => (
      <li
        key={i}
        className="col fxg0 fourth mB5 pR3">
        <Link
          to={`/org/${org.id}`}
          className="fs6 lh1 noUnderline">
          <div className="mB1">
            {org.category}
          </div>
          <h2 className="dBl lh1 fs3 underline">
            {org.name}
          </h2>
          {props.showLocation && `Based in ${org.city}`}
        </Link>
      </li>
    ))}
  </ul>
));
