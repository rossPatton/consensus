import React, { memo } from 'react';
import { Link } from 'react-router-dom';

export const BreadcrumbsComponent = memo((props: any) => (
  <ul className="fs6 fw600 mB2 lh1 lsNone fx fxWrap brdB1 mB3 pB3">
    {console.log('props => ', props)}
    {props.country && (
      <li className="mR1">
        {!props.region && props.country.name}
        {props.region && (
          <Link to={`/${props.country.code}`}>
            {props.country.name}
          </Link>
        )}
      </li>
    )}
    {props.region && (
      <li className="mHide mR1">/</li>
    )}
    {props.region && (
      <li className="mR1">
        {!props.city && props.country.name}
        {props.city && (
          <Link to={`/${props.country.code}/${props.region.code}`}>
            {props.region.name}
          </Link>
        )}
      </li>
    )}
    <li className="mHide mR1">/</li>
    <li className="mR1">
      <Link to="/us/ny/new-york-city">
        New York City
      </Link>
    </li>
  </ul>
));
