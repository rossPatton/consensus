import React, { memo } from 'react';
import {Link} from 'react-router-dom';

const Footer = memo(() => (
  <footer className="bg-gray-2">
    <div className="pt-5 contain m-auto pb-3 border-b">
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
          <Link to="/event/100">
            Events
          </Link>
        </li>
      </ul>
    </div>
    <div className="bg-gray-3 pt-4 pb-5">
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
    </div>
  </footer>
));

export default Footer;
