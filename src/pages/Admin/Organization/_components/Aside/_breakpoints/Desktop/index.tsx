import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import cx from 'classnames';

import {tProps} from '../../_types';
import {Avatar} from '../../../../../../../components';

const Aside = memo((props: tProps) => {
  const {session} = props;

  return (
    <aside className="order-1 min-w-1/3 bg-white rounded p-2 mr-2">
      <div className="text-left flex items-center mb-2 text-center">
        <Avatar
          hash={session.profile.avatarHash}
          size="60"
          type="group"
        />
        <div>
          <h1 className="text-3">
            <Link
              className="no-underline"
              to="/admin/meetings">
              {session.isVerified && (
                <span
                  aria-label="Verified Account Checkbox"
                  className="inline-block mr-1"
                  role="img">
                  ✅
                </span>
              )}
              {props.session.profile.name}
            </Link>
          </h1>
          <div>
            <Link
              to="/admin/account"
              className="mr-1 text-sm">
              Account
            </Link>
            <Link
              to="/admin/profile"
              className="text-sm">
              Profile
            </Link>
          </div>
        </div>
      </div>
      <ul className="mb-2" role="navigation">
        <li className="font-bold">
          Admin Actions
        </li>
        <li className="flex items-center text-base p-1 mb-1 rounded hover:bg-gray-2">
          <div className="bg-white border rounded-circ mr-2 p-2" />
          {props.isMeetings && 'Edit Meetings & Drafts'}
          {!props.isMeetings && (
            <Link
              to="/admin/meetings"
              className={cx({
                curDisable: !props.session.isVerified,
              })}>
              Edit Meetings & Drafts
            </Link>
          )}
        </li>
        <li className="flex items-center text-base p-1 mb-1 rounded hover:bg-gray-2">
          <div className="bg-white border rounded-circ mr-2 p-2" />
          {props.isMembers && 'Manage Members & Approvals'}
          {!props.isMembers && (
            <Link
              to="/admin/memberships"
              className={cx({
                curDisable: !props.session.isVerified,
              })}>
              Manage Members & Approvals
            </Link>
          )}
        </li>
        <li className="flex items-center text-base p-1 rounded hover:bg-gray-2">
          <div className="bg-white border rounded-circ mr-2 p-2" />
          {props.isMeetingForm && 'Plan Meeting'}
          {!props.isMeetingForm && (
            <Link
              to="/admin/planMeeting"
              className={cx({
                curDisable: !props.session.isVerified,
              })}>
              Plan Meeting
            </Link>
          )}
        </li>
      </ul>
      <div className="font-bold">
        Other actions
      </div>
      <div className="flex items-center">
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
          to="/admin/deleteGroup"
          className="btn w-full text-sm p-2 hover:bg-gray-3">
          {session.deletionDeadline
            ? 'Cancel group deletion'
            : 'Delete your Group'}
        </Link>
      </div>
    </aside>
  );
});

export default Aside;
