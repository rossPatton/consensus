import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Avatar, Search} from '../../../../components';
import {tComponentProps} from './_types';

export const HeaderComponent = memo((props: tComponentProps) => (
  <header className="bg-white shadow fixed t l r pt-2 pb-2 z-50">
    <div className="contain m-auto flex items-center relative">
      <div>
        <Link to="/">
          <img
            alt="Consensus"
            src="/static/images/logo.svg"
            width="125"
          />
        </Link>
      </div>
      <div className="flex items-center absolute r text-right">
        <Search />
        {!props.session.isAuthenticated && (
          <Link
            to="/login"
            id="a11yLogin"
            className="font-bold underline">
            Login/Signup
          </Link>
        )}
        {props.session.isAuthenticated
          && (
            <>
              <Link
                id="a11yAdmin"
                to="/admin/meetings">
                <Avatar
                  alt="Your Dashboard"
                  hash={props.session.profile.avatarHash}
                  size="40"
                  // @TODO need to re-standardize....
                  type={props.session.type === 'org' ? 'group' : 'user'}
                />
              </Link>
              {/* <form action="/auth/v1/logout">
                <fieldset>
                  <button
                    id="a11yLogout"
                    className="transition hover:bg-gray-3"
                    onClick={props.logout}>
                  Logout
                  </button>
                </fieldset>
              </form> */}
            </>
          )}
      </div>
    </div>
  </header>
));
