import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from '../../_types';

const CurrentProfile = memo((props: tComponentProps) => (
  <div className="rel">
    <Link
      className="fs7 leading-none text-bold abs t r"
      to={`/org/${props.session.profile.id}`}>
      View Group
    </Link>
    <h1 className="fs3 mb-3 leading-none">
      Group Profile
    </h1>
    <h2 className="fs5 mb-3 leading-none">
      Name: <span className="copyBlack">
        {props.session.profile.name}
      </span>
    </h2>
    <h2 className="fs5 mb-3 leading-none">
      URL: <span className="copyBlack">
        {props.handle}
      </span>
    </h2>
    <h2 className="fs5 mb-3 leading-none">
      Group Type: <span className="copyBlack capitalize">
        {props.type}
      </span> and <span className="copyBlack">{props.allowNonVerified
        ? 'any user can join'
        : 'only verified users can join'}</span>
    </h2>
    <h2 className="fs5 mb-3 leading-none">
      Category: <span className="copyBlack">
        {props.category}
      </span>
    </h2>
    <h2 className="fs5 mb-3 leading-none">
      Member title: <span className="copyBlack">
        {props.memberName}
      </span>
    </h2>
    <h2 className="fs5 mb-3 leading-none">
      Moderator title: <span className="copyBlack">
        {props.modName}
      </span>
    </h2>
    {props.website && (
      <h2 className="fs5 mb-3 leading-none">
        Group Website <span className="copyBlack">
          {props.website}
        </span>
      </h2>
    )}
    {props.facebook && (
      <h2 className="fs5 mb-3 leading-none">
        Facebook <span className="copyBlack">
          {props.facebook}
        </span>
      </h2>
    )}
    {props.twitter && (
      <h2 className="fs5 mb-3 leading-none">
        Twitter <span className="copyBlack">
          {props.twitter}
        </span>
      </h2>
    )}
    {props.description && (
      <>
        <h2 className="fs5 mb-1 leading-none">
          Description:
        </h2>
        <div className="mb-3">
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
      className="btn p-3 pl-4 pR4 hover:bg-gray-11 trans1">
      Edit profile
    </Link>
  </div>
));

export default CurrentProfile;
