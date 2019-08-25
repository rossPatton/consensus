import React, { memo } from 'react';
import { Link } from 'react-router-dom';

export const Breadcrumbs = memo(() => (
  <ul className="fs6 fw600 mB2 lh1 lsNone fx fxWrap brdB1 mB3 pB3">
    <li className="mR1">
      <Link to="/us">
        United States
      </Link>
    </li>
    <li className="mHide mR1">/</li>
    <li className="mR1">
      <Link to="/us/ny">
        New York
      </Link>
    </li>
    <li className="mHide mR1">/</li>
    <li className="mR1">
      <Link to="/us/ny/new-york-city">
        New York City
      </Link>
    </li>
    <li className="mHide mR1">/</li>
    <li>
      <Link to="/science-and-tech-activism/us/ny/nyc">
        Tech and Science Activism
      </Link>
    </li>
  </ul>
));
