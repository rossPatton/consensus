import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from './_types';

export const HeaderComponent = memo((props: tComponentProps) => (
  <header className="bgWhite bxSh1 fix t l r pT3 pB3 z99">
    <div className="contain fx aiCtr rel">
      {/* <button
        className="bg0 brd0 abs l"
        onClick={props.toggleNav}>
        <img alt="" src="/static/images/ham.svg" width="40" />
      </button>*/}
      <Link to="/">
        <img
          alt="Unison"
          src="/static/images/logo.svg"
          width="125"
        />
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
              className="mR2"
              to="/admin/profile">
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
