import React, { memo } from 'react';
import {Link} from 'react-router-dom';

const Footer = memo(() => (
  <footer>
    <div className="bg-gray-1 brdT1 pt-4">
      <ul className="contain pb-3 mb-3 brdB1">
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
      <ul className="contain pb-4">
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
    <div className="bgGrey2 pt-4 pb-4">
      <div className="contain fs5">
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
