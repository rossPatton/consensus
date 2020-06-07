import React, { memo } from 'react';
import {Link} from 'react-router-dom';

const Footer = memo(() => (
  <footer className="pt-4 pb-4 bg-gray-2">
    <div className="contain font-semibold m-auto">
      <b>© Consensus 2020</b>
      <ul>
        <li className="mb-1">
          <Link to="/login">
            Login
          </Link>
        </li>
        <li className="mb-1">
          <Link to="/signup">
            Sign up
          </Link>
        </li>
        <li className="mb-1">
          <Link to="/directory/us">
            Directory
          </Link>
        </li>
        <li className="mb-1">
          <Link to="/terms-and-conditions">
            Terms and Conditions
          </Link>
        </li>
        <li>
          <Link to="/privacy-policy">
            Privacy Policy
          </Link>
        </li>
      </ul>
    </div>
  </footer>
));

export default Footer;
