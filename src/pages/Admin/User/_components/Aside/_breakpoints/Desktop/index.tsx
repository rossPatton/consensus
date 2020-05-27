import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Avatar} from '~app/components';

import {tProps} from '../../_types';

const Aside = memo((props: tProps) => {
  const {groupsByUserIdThunk} = props;
  const {profile} = props.session;

  return (
    <aside className="border shadow order-1 min-w-1/3 bg-white rounded p-2 mr-2">
      <div className="flex flex-row items-center mb-2">
        <Avatar
          hash={props.session.profile.avatar}
          type="users"
        />
        <div>
          <Link
            to="/admin/meetings"
            className="font-bold no-underline mr-1">
            @{profile.username}
          </Link>
          <div className="font-semibold text-sm text-gray-5">
            <Link
              to="/admin/account"
              className="mr-1">
              Account
            </Link>
            <Link to="/admin/profile">
              Profile
            </Link>
          </div>
        </div>
      </div>
      <ul className="mb-2 font-semibold" role="navigation">
        <li className="font-bold">
          Your Actions
        </li>
        <li className="flex items-center text-base p-1 mb-1 rounded hover:bg-gray-2">
          <div className="bg-white border rounded-circ mr-2 p-2" />
          {props.isInvite && 'Your pending invitations'}
          {!props.isInvite && (
            <Link
              to="/admin/invite"
              className={cx({
                curDisable: !props.session.isVerified,
              })}>
              Your pending invitations
            </Link>
          )}
        </li>
      </ul>
      {!groupsByUserIdThunk.isLoading
        && groupsByUserIdThunk.data.length > 0
        && (
          <ul className="mb-3" role="navigation">
            <li className="font-semibold mb-1">
              Your groups
            </li>
            {groupsByUserIdThunk.data.slice(0, 3).map((group, i) => {
              const roleMap = _.find(props.roles, r => r.groupId === group.id) || {};
              const {role} = roleMap as ts.roleMap;
              if (role === 'pending') return null;

              return (
                <li key={i}>
                  <Link
                    to={`/group/${group.handle}`}
                    className="rounded p-1 flex items-center no-underline hover:bg-gray-2 transition duration-150">
                    <Avatar
                      hash={group.avatar}
                      size="sm"
                      type="groups"
                    />
                    <div>
                      <div className="text-sm font-semibold">
                        You are a {role}
                      </div>
                      <h2 className="text-base text-gray-5 leading-none">
                        {group.name}
                      </h2>
                    </div>
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                to="/admin/memberships"
                className="pl-1 text-sm">
                View all
              </Link>
            </li>
          </ul>
        )}
      <div className="font-semibold mb-1">
        Other actions
      </div>
      <div className="flex flex-row items-center">
        <form
          className="w-full mr-1"
          action="/api/v1/download">
          <fieldset>
            <button className="w-full text-sm p-2 hover:bg-gray-3">
              <legend className="w-full whitespace-no-wrap flex justify-center items-center">
                <img
                  alt=""
                  height="20"
                  className="mr-1"
                  src="/images/download.svg"
                  width="20"
                /> Download data
              </legend>
            </button>
          </fieldset>
        </form>
        <Link
          to="/admin/deleteAccount"
          className="btn w-full text-sm p-2 whitespace-no-wrap flex justify-center items-center hover:bg-gray-3">
          <img
            alt=""
            height="20"
            className="mr-1"
            src="/images/delete.svg"
            width="20"
          /> Delete Account
        </Link>
      </div>
    </aside>
  );
});

export default Aside;
