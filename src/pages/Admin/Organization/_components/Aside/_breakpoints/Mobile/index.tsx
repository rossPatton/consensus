import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tProps} from '../../_types';

const MobileAside = memo((props: tProps) => {
  const {session} = props;

  return (
    <aside className="bg-white p-2 rounded order-2 w-full">
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
      <div className="flex flex-col">
        <form
          className="w-full mb-1"
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

export default MobileAside;
