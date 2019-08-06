import { Link } from 'react-router-dom';
import React, { memo } from 'react';

import { tProps } from './_types';

export const HeaderComponent = memo((props: tProps) => (
  <header className="bgBlack fix t l r pT3 pB3 z99">
    <div className="contain fx aiCtr jcCtr rel">
      <Link className="abs l" to="/us/ny/nyc/tech-workers-coalition">
        <img alt="" src="/static/images/ham.svg" width="40" />
      </Link>
      <Link to="/">
        <img alt="" src="/static/images/logo.svg" width="150" />
      </Link>
      {!props.session.isAuthenticated && (
        <div className="abs r">
          <Link
            to="/signup"
            id="a11ySignup"
            className="br16 p1 pL3 pR3 fs6 bgGreen black">
            Sign Up
          </Link>
          <Link
            to="/login"
            id="a11yLogin"
            className="mL3 fs6 white">
            Login
          </Link>
        </div>
      )}
      {props.session.isAuthenticated && (
        <div className="fx abs r fs5">
          <Link
            id="a11yAdmin"
            to="/admin"
            className="mR2 white noUnderline">
            {props.session.fname}
          </Link>
          <button
            id="a11yLogout"
            onClick={() => fetch('/auth/logout').then(props.logout)}
            className="bg0 p0 white">
            Logout
          </button>
        </div>
      )}
    </div>
  </header>
));
