import { Link } from 'react-router-dom';
import React, { memo } from 'react';

import { tProps } from './_types';

export const HeaderComponent = memo((props: tProps) => (
  <header className="bgWhite bxSh1 fix t l r pT3 pB3 z99">
    <div className="contain fx aiCtr jcCtr rel">
      <Link className="abs l" to="/us/ny/nyc/tech-workers-coalition/overview">
        <img alt="" src="/static/images/ham.svg" width="40" />
      </Link>
      <Link to="/">
        <img alt="" src="/static/images/logo.svg" width="125" />
      </Link>
      {!props.session.isAuthenticated && (
        <div className="abs r fs6">
          <Link
            to="/signup"
            id="a11ySignup"
            className="brdA1 br4 p1 pL2 pR2 mR2 fw600 trans1 hvrBgGrey1">
            Sign Up
          </Link>
          <Link
            to="/login"
            id="a11yLogin">
            Login
          </Link>
        </div>
      )}
      {props.session.isAuthenticated && (
        <div className="fx abs r">
          <Link
            id="a11yAdmin"
            to="/admin"
            className="fs6 mR2 fw600">
            Account
          </Link>
          <button
            id="a11yLogout"
            onClick={() => fetch('/auth/logout').then(props.logout)}
            className="bg0 p0 ba0 fs6">
            Logout
          </button>
        </div>
      )}
    </div>
  </header>
));
