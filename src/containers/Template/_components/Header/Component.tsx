import cx from 'classnames';
import React, {memo, useContext, useState} from 'react';
import {Link} from 'react-router-dom';

import {Avatar, Search} from '~app/components';
import {OutsideClick} from '~app/containers';
import {MediaContext} from '~app/context';

import {tComponentProps} from './_types';

export const HeaderComponent = memo((props: tComponentProps) => {
  const {isMobile} = useContext(MediaContext);
  const [showMenu, toggleMenu] = useState(false);
  const [showNav, toggleNav] = useState(false);
  const {handle, regionCode} = props.geo;
  const city = handle ? `/${regionCode}/${handle}` : '';

  return (
    <>
      <header className="flex bg-white shadow fixed t l r z-50">
        <div className="contain m-auto flex items-center relative">
          {isMobile && (
            <div className="flex flex-col mr-2 outline-none">
              <OutsideClick
                handleChange={toggleNav}
                render={() => (
                  <>
                    <button
                      className="border-0 outline-none"
                      onClick={() => toggleNav(!showNav)}>
                      {showNav && (
                        <img
                          alt="Click to close navigation"
                          src="/images/close.svg"
                          width="22"
                        />
                      )}
                      {!showNav && (
                        <img
                          alt="Click to open navigation"
                          src="/images/ham.svg"
                          width="25"
                        />
                      )}
                    </button>
                    <ul
                      className={cx({
                        'bg-white border font-bold p-2 rounded shadow t-hdr absolute animated': true,
                        'hidden': !showNav,
                        'fadeInDown': showNav,
                      })}>
                      <li className="mb-1">
                        <Search
                          className="border-0 border-b-2 border-black pl-3"
                          placeholder="Search"
                        />
                      </li>
                      <li className="mb-1">
                        <Link to={'/directory/us'}>
                        Browse by City
                        </Link>
                      </li>
                      <li className="mb-1">
                        <Link to="/categories">
                        Browse by Group
                        </Link>
                      </li>
                    </ul>
                  </>
                )}
              />
            </div>
          )}
          <Link to="/">
            <img
              alt="Consensus"
              className="mr-3"
              height="18"
              src="/images/logo.svg"
              width="125"
            />
          </Link>
          <ul className="hidden d:flex flex-row font-semibold">
            <li className="mr-2">
              <Link to={`/directory/us${city}`}>
              Browse by City
              </Link>
            </li>
            <li>
              <Link to="/categories">
              Browse by Group
              </Link>
            </li>
          </ul>
          {!props.session.isAuthenticated && (
            <div className="flex-1 flex-col text-right outline-none">
              <OutsideClick
                handleChange={toggleMenu}
                render={() => (
                  <>
                    <button
                      className="border-0 outline-none"
                      onClick={() => toggleMenu(!showMenu)}>
                      <img
                        alt="Click to toggle login or signup buttons"
                        height="30"
                        src="/images/profile.svg"
                        width="30"
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
                          to="/login/user"
                          id="a11yLogin"
                          className="btn inline-block p-1 pl-2 pr-2 hover:bg-gray-2">
                        Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/signup/user"
                          id="a11ySignup"
                          className="btn inline-block p-1 pl-2 pr-2 hover:bg-gray-2">
                        Signup
                        </Link>
                      </li>
                    </ul>
                  </>
                )}
              />
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
                        className="rounded-circ"
                        hash={props.session.profile.avatar}
                        size="sm"
                        type={`${props.session.type}s` as 'groups' | 'users'}
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
                          className="btn inline-block p-1 pl-2 pr-2 hover:bg-gray-2"
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
      <noscript>Your browser does not support JavaScript!</noscript>
    </>
  );
});
