import cx from 'classnames';
import React, {memo, useState} from 'react';
import {Link} from 'react-router-dom';

import {Avatar, Search} from '~app/components';
import {OutsideClick} from '~app/containers';

import {tComponentProps} from './_types';

export const HeaderComponent = memo((props: tComponentProps) => {
  const [showMenu, toggleMenu] = useState(false);
  const [showNav, toggleNav] = useState(false);

  return (
    <header className="flex bg-white shadow fixed t l r z-50">
      <div className="contain m-auto flex items-center relative">
        <div className="flex flex-col mr-2 outline-none">
          <OutsideClick
            handleChange={toggleNav}
            render={() => (
              <>
                <button
                  className="border-0 outline-none"
                  onClick={() => toggleNav(!showNav)}>
                  <img
                    alt="Click for navigation"
                    src="/static/images/ham.svg"
                    width="30"
                  />
                </button>
                <ul
                  className={cx({
                    'bg-white border font-bold p-2 rounded shadow t-hdr absolute animated': true,
                    'hidden': !showNav,
                    'fadeInDown': showNav,
                  })}>
                  <li>
                    <Search className="mb-2" />
                  </li>
                  <li className="mb-1">
                    <Link to="/categories">
                      Categories
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link to="/directory/us">
                      Directory
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link to="/search">
                      Search
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link to="/login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      Signup
                    </Link>
                  </li>
                </ul>
              </>
            )}
          />
        </div>
        <Link to="/">
          <img
            alt="Consensus"
            className="d:m-auto"
            src="/static/images/logo.svg"
            width="125"
          />
        </Link>
        {!props.session.isAuthenticated && (
          <div className="absolute r text-right">
            <Link
              to="/login"
              id="a11yLogin"
              className="font-bold underline text-black">
              Login/Signup
            </Link>
          </div>
        )}
        {props.session.isAuthenticated
          && (
            <div className="flex-1 flex-col text-right outline-none">
              <OutsideClick
                handleChange={toggleMenu}
                render={() => (
                  <>
                    <button
                      className="border-0 outline-none"
                      onClick={() => toggleMenu(!showMenu)}>
                      <Avatar
                        alt="Your Avatar - click to open dashboard menu"
                        className=""
                        hash={props.session.profile.avatar}
                        size="40"
                        type={props.session.type}
                      />
                    </button>
                    <ul
                      className={cx({
                        'bg-white border font-bold p-2 rounded shadow text-right t-hdr absolute r animated': true,
                        'hidden': !showMenu,
                        'fadeInDown': showMenu,
                      })}>
                      <li className="mb-1">
                        <Link
                          className="btn p-1 pl-2 pr-2 hover:bg-gray-2"
                          id="a11yAdmin"
                          to="/admin/meetings">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <form action="/auth/v1/logout">
                          <fieldset>
                            <button
                              id="a11yLogout"
                              className="p-1 pl-2 pr-2 hover:bg-gray-2"
                              onClick={props.logout}>
                              Logout
                            </button>
                          </fieldset>
                        </form>
                      </li>
                    </ul>
                  </>
                )}
              />
            </div>
          )}
      </div>
    </header>
  );
});
