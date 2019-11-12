import React, { memo } from 'react';
import { Link } from 'react-router-dom';

export const Nav = memo(() => (
  <nav className="mT5 brdB1">
    <ul className="contain fx brdL1">
      <li className="col p2 pL3 pR3 brdR1">
        <Link to="/directory/us">Directory</Link>
      </li>
      <li className="col p2 pL3 pR3 brdR1">
        <Link to="/categories">Categories</Link>
      </li>
    </ul>
  </nav>
));
