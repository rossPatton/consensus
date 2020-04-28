import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Avatar, Search} from '~app/components';

import {tComponentProps} from './_types';

export const HeaderComponent = memo((props: tComponentProps) => (
  <header className="flex bg-white shadow fixed t l r z-50">
    <div className="contain m-auto flex items-center relative">
      <div>
        make nav
      </div>
      <div>
        <Link to="/">
          <img
            alt="Consensus"
            src="/static/images/logo.svg"
            width="125"
          />
        </Link>
      </div>
      <div className="flex items-center absolute r text-right d:w-1/3">
        <Search className="mr-2 hidden d:block d:w-full" />
        {!props.session.isAuthenticated && (
          <Link
            to="/login"
            id="a11yLogin"
            className="font-bold underline text-black">
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
