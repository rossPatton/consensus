import cx from 'classnames';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {JoinForm, LeaveForm} from '..';
import {PlaceholderImage} from '../../../../components';
import {tComponentProps} from './_types';

export const OrganizationInfoComponent = memo((props: tComponentProps) => {
  const {match, org, role} = props;
  const {description = ''} = props.org;

  return (
    <div className="bgWhite br8 mR3 c3 col growNone ovfHide">
      <div className="bgGrey4 lh1 fx aiCtr jcBetween p3">
        {!role && (
          <small className="fs6 fw600 white">
            {org.type === 'public' && 'Public Group'}
            {org.type === 'private' && 'Private Group'}
            {org.type === 'invite' && 'Invite-Only Group'}
          </small>
        )}
        <div
          className={cx({
            'col fx aiCtr': true,
            jcEnd: !role,
          })}>
          <JoinForm role={role} />
        </div>
        <LeaveForm org={org} role={role} />
      </div>
      <div className="p3">
        <div className="mB3">
          <div className="fx aiCtr">
            <div className="circ mR2 ovfHide">
              <PlaceholderImage
                height={60}
                width={60}
              />
            </div>
            <div>
              <small className="ttUpper fs7">
                {props.org.category}
              </small>
              <h1 className="fs3 lh1">
                {typeof match.params.section === 'undefined' && (
                  props.org.name
                )}
                {typeof match.params.section !== 'undefined' && (
                  <Link
                    to={`/org/${org.id}`}
                    title="Click to return to events page">
                    {props.org.name}
                  </Link>
                )}
              </h1>
              {props.role
                && props.role !== 'pending'
                && props.members.length > 0
                && (
                  <Link
                    to={`/org/${org.id}/members`}
                    className="fs7"
                    title="Click to browse member list">
                    {props.members.length} Members
                  </Link>
                )}
            </div>
          </div>
        </div>
        <p className="fs6">
          {description.split('\n')[0]}
        </p>
        <div>
        social media links down here
        </div>
      </div>
    </div>
  );
});
