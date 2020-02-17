import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {JoinForm} from '..';
// import {Link} from 'react-router-dom';
// import regionMap from '../../../../json/usa/stateCodeMap.json';
// import {lowerCase, slugify} from '../../../../utils';
import {tComponentProps} from './_types';

export const OrganizationInfoComponent = memo((props: tComponentProps) => {
  const {org, role} = props;
  const showJoinButton = org.type === 'public' || org.type === 'private';

  return (
    <div className="bgWhite br8 mR3 c3 col growNone ovfHide">
      <div className="bgGrey4 lh1 fx aiCtr jcBetween p3">
        <small className="fs6 fw600 white">
          {org.type === 'public' && 'Public Group'}
          {org.type === 'private' && 'Private Group'}
          {org.type === 'invite' && 'Invite-Only Group'}
        </small>
        {showJoinButton && <JoinForm role={role} />}
      </div>
      <div className="p3">
        <div className="mB3">
          <div className="fx aiCtr">
            <div>
              <div className="circ p3 mR2 bgGrey2" />
            </div>
            <div>
              <small className="ttUpper fs7">
                {props.org.category}
              </small>
              <h1 className="fs3 lh1">
                {props.org.name}
              </h1>
            </div>
          </div>
          {props.role
            && props.role !== 'pending'
            && props.members.length > 0
            && (
              <Link
                to="members"
                className="noUnderline copyBlack"
                title="Click to browse member list">
                {props.members.length} members
              </Link>
            )}
        </div>
        {/* <small className="fw600">
          Based in <Link to={`/directory/us/${region}/${citySlug}`}>
            {props.org.city}
          </Link>
        </small> */}
        <p className="fs6">
          {props.org.description.split('\n')[0]}
        </p>
        <div>
        social media links down here
        </div>
      </div>
    </div>
  );
});
