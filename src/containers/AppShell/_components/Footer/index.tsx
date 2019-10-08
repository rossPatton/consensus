import React, { memo } from 'react';
import {Link} from 'react-router-dom';

export const Footer = memo(() => (
  <footer>
    <div className="bgGrey1 brdT1 pT4">
      <ul className="contain pB3 mB3 brdB1">
        <li>
          <Link to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link to="/signup/newUser">
            Sign up
          </Link>
        </li>
        <li>
          <Link to="/signup/newOrg">
            Start a new org
          </Link>
        </li>
      </ul>
      <ul className="contain pB4">
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
    <div className="bgGrey2 pT4 pB4">
      <div className="contain fs5">
        <b>© Consensus 2019</b>
        <ul className="fx">
          <li className="mR3">
            Terms of Service
          </li>
          <li className="mR3">
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
