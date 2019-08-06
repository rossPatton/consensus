import { Link } from 'react-router-dom';
import React, { memo } from 'react';

export const Nav = memo(() => (
  <nav className="pT5 hide">
    <ul>
      <li>
        <Link to="/us/ny/nyc/tech-workers-coalition">TWC</Link>
      </li>
      <li>
        <Link to="/">home</Link>
      </li>
      <li>
        <Link to="/config">config</Link>
      </li>
      <li>
        <Link to="/status">status</Link>
      </li>
    </ul>
  </nav>
));
