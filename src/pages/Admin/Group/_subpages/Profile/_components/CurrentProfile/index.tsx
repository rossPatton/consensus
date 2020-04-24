import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from '../../_types';

const CurrentProfile = memo((props: tComponentProps) => (
  <div className="relative">
    <Link
      className="text-sm leading-none font-bold absolute t r"
      to={`/group/${props.session.profile.id}`}>
      View Group
    </Link>
    <h1 className="text-3 mb-2 leading-none">
      Group Profile
    </h1>
    <h2 className="text-base mb-2 leading-none">
      Name: <span className="text-gray-4">
        {props.session.profile.name}
      </span>
    </h2>
    <h2 className="text-base mb-2 leading-none">
      URL: <span className="text-gray-4">
        {props.handle}
      </span>
    </h2>
    <h2 className="text-base mb-2 leading-none">
      Group Type: <span className="text-gray-4 capitalize">
        {props.type}
      </span> and <span className="text-gray-4">{props.allowNonVerified
        ? 'any user can join'
        : 'only verified users can join'}</span>
    </h2>
    <h2 className="text-base mb-2 leading-none">
      Category: <span className="text-gray-4">
        {props.category}
      </span>
    </h2>
    <h2 className="text-base mb-2 leading-none">
      Member title: <span className="text-gray-4">
        {props.memberName}
      </span>
    </h2>
    <h2 className="text-base mb-2 leading-none">
      Moderator title: <span className="text-gray-4">
        {props.modName}
      </span>
    </h2>
    {props.website && (
      <h2 className="text-base mb-2 leading-none">
        Group Website <span className="text-gray-4">
          {props.website}
        </span>
      </h2>
    )}
    {props.facebook && (
      <h2 className="text-base mb-2 leading-none">
        Facebook <span className="text-gray-4">
          {props.facebook}
        </span>
      </h2>
    )}
    {props.twitter && (
      <h2 className="text-base mb-2 leading-none">
        Twitter <span className="text-gray-4">
          {props.twitter}
        </span>
      </h2>
    )}
    {props.description && (
      <div className="mb-3">
        <h2 className="text-base mb-1 leading-none">
          Description:
        </h2>
        {props.description.split('\n').map((p, i) => (
          <p
            key={i}
            className="mb-1">
            {p}
          </p>
        ))}
      </div>
    )}
    <Link
      to="/admin/profile/edit"
      className="btn p-2 pl-3 pr-3 hover:bg-gray-3">
      Edit profile
    </Link>
  </div>
));

export default CurrentProfile;
