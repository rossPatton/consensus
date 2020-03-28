import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from '../../_types';

const CurrentProfile = memo((props: tComponentProps) => (
  <div className="rel">
    <Link
      className="fs7 lh1 fw600 abs t r"
      to={`/org/${props.session.profile.id}`}>
      View Group
    </Link>
    <h1 className="fs3 mB3 lh1">
      Group Profile
    </h1>
    <h2 className="fs5 mB3 lh1">
      Name: <span className="copyBlack">
        {props.session.profile.name}
      </span>
    </h2>
    <h2 className="fs5 mB3 lh1">
      URL: <span className="copyBlack">
        {props.handle}
      </span>
    </h2>
    <h2 className="fs5 mB3 lh1">
      Group Type: <span className="copyBlack ttCap">
        {props.type}
      </span> and <span className="copyBlack">{props.allowNonVerified
        ? 'any user can join'
        : 'only verified users can join'}</span>
    </h2>
    <h2 className="fs5 mB3 lh1">
      Category: <span className="copyBlack">
        {props.category}
      </span>
    </h2>
    <h2 className="fs5 mB3 lh1">
      Member title: <span className="copyBlack">
        {props.memberName}
      </span>
    </h2>
    <h2 className="fs5 mB3 lh1">
      Moderator title: <span className="copyBlack">
        {props.modName}
      </span>
    </h2>
    {props.website && (
      <h2 className="fs5 mB3 lh1">
        Group Website <span className="copyBlack">
          {props.website}
        </span>
      </h2>
    )}
    {props.facebook && (
      <h2 className="fs5 mB3 lh1">
        Facebook <span className="copyBlack">
          {props.facebook}
        </span>
      </h2>
    )}
    {props.twitter && (
      <h2 className="fs5 mB3 lh1">
        Twitter <span className="copyBlack">
          {props.twitter}
        </span>
      </h2>
    )}
    {props.description && (
      <>
        <h2 className="fs5 mB1 lh1">
          Description:
        </h2>
        <div className="mB3">
          {props.description.split('\n').map((p, i) => (
            <p key={i}>
              {p}
            </p>
          ))}
        </div>
      </>
    )}
    <Link
      to="/admin/profile/edit"
      className="btn p3 pL4 pR4 hvrBgGrey1 trans1">
      Edit profile
    </Link>
  </div>
));

export default CurrentProfile;
