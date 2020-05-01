import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Avatar} from '~app/components';

import {tProps} from '../../_types';

const Aside = memo((props: tProps) => {
  const {session, groupsByUserIdThunk} = props;
  const {profile} = props.session;

  return (
    <aside className="border shadow order-1 min-w-1/3 bg-white rounded p-2 mr-2">
      <div className="flex flex-row items-center mb-2">
        <Avatar
          hash={props.session.profile.avatarHash}
          size="60"
          type="user"
        />
        <div>
          <Link
            to="/admin/meetings"
            className="no-underline">
            {session.isVerified && (
              <span
                aria-label="Verified Account Checkbox"
                className="inline-block mr-1"
                role="img">
                ✅
              </span>
            )}
            @{profile.username}
          </Link>
          <div className="text-sm text-gray-5">
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
      {!groupsByUserIdThunk.isLoading
        && groupsByUserIdThunk.data.length > 0
        && (
          <ul className="mb-3" role="navigation">
            <li className="mb-1">
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
                      hash={group.avatarHash}
                      size="40"
                      type="group"
                    />
                    <div>
                      <div className="text-sm">
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
      <div className="mb-1">
        Other actions
      </div>
      <div className="flex flex-row items-center">
        <form
          className="w-full mr-1"
          action="/api/v1/download">
          <fieldset>
            <button className="w-full text-sm p-2 hover:bg-gray-3">
              <legend className="w-full">
                Download your data
              </legend>
            </button>
          </fieldset>
        </form>
        <Link
          to="/admin/deleteAccount"
          className="btn w-full text-sm p-2 hover:bg-gray-3">
          Delete your account
        </Link>
      </div>
    </aside>
  );
});

export default Aside;
