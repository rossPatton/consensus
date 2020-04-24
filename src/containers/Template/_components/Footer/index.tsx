import React, { memo } from 'react';
import {Link} from 'react-router-dom';

const Footer = memo(() => (
  <footer className="pt-4 pb-4 bg-gray-2">
    <div className="mb-3 contain m-auto">
      <ul>
        <li>
          <Link to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link to="/signup">
            Sign up
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/directory/us">
            Directory
          </Link>
        </li>
        <li>
          <Link to="/meeting/100">
            Meetings
          </Link>
        </li>
      </ul>
    </div>
    <div className="contain m-auto">
      <b>© Consensus 2019</b>
      <ul className="fx">
        <li className="mr-3">
          Terms of Service
        </li>
        <li className="mr-3">
          Privacy Policy
        </li>
        <li>
          Cookie Policy
        </li>
      </ul>
    </div>
  </footer>
));

export default Footer;
