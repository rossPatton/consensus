import { Link } from 'react-router-dom';
import React, { memo } from 'react';

import { tProps } from './_types';

export const HeaderComponent = memo((props: tProps) => (
  <header className="bgWhite bxSh1 fix t l r pT3 pB3 z99">
    <div className="contain fx aiCtr jcCtr rel">
      <Link className="abs l" to="/us/ny/new-york-city/tech-workers-coalition-nyc/overview">
        <img alt="" src="/static/images/ham.svg" width="40" />
      </Link>
      <Link to="/">
        <img alt="Unison" src="/static/images/logo.svg" width="125" />
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
        <form
          action="/auth/logout"
          className="abs r fs6">
          <fieldset className="fx">
            <Link
              id="a11yAdmin"
              to="/admin"
              className="mR2">
              Account
            </Link>
            <button
              id="a11yLogout"
              className="trans1 hvrBgGrey1"
              onClick={props.logout}>
              Logout
            </button>
          </fieldset>
        </form>
      )}
    </div>
  </header>
));
