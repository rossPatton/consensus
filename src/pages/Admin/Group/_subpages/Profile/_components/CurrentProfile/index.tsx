import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from '../../_types';

const CurrentProfile = memo((props: tComponentProps) => (
  <div className="relative">
    <Link
      className="text-sm leading-none font-bold absolute t r"
      to={`/group/${props.session.profile.handle}`}>
      View Group
    </Link>
    <h2 className="text-3 mb-2 leading-none">
      Group Profile
    </h2>
    <h3 className="text-base mb-2 leading-none">
      <span className="font-semibold">Name:</span> <span className="text-gray-5">
        {props.session.profile.name}
      </span>
    </h3>
    <h3 className="text-base mb-2 leading-none">
      <span className="font-semibold">URL:</span> <span className="text-gray-5">
        {props.handle}
      </span>
    </h3>
    <h3 className="text-base mb-2 leading-none">
      <span className="font-semibold">Group Type:</span> <span className="text-gray-5 capitalize">
        {props.type}
      </span>
    </h3>
    <h3 className="text-base mb-2 leading-none">
      <span className="font-semibold">Category:</span> <span className="text-gray-5">
        {props.category}
      </span>
    </h3>
    <h3 className="text-base mb-2 leading-none">
      <span className="font-semibold">Member title:</span> <span className="text-gray-5">
        {props.memberName}
      </span>
    </h3>
    <h3 className="text-base mb-2 leading-none">
      <span className="font-semibold">Moderator title:</span> <span className="text-gray-5">
        {props.modName}
      </span>
    </h3>
    {props.website && (
      <h3 className="text-base mb-2 leading-none">
        <span className="font-semibold">Group Website</span> <span className="text-gray-5">
          {props.website}
        </span>
      </h3>
    )}
    {props.facebook && (
      <h3 className="text-base mb-2 leading-none">
        <span className="font-semibold">Facebook</span> <span className="text-gray-5">
          {props.facebook}
        </span>
      </h3>
    )}
    {props.twitter && (
      <h3 className="text-base mb-2 leading-none">
        <span className="font-semibold">Twitter</span> <span className="text-gray-5">
          {props.twitter}
        </span>
      </h3>
    )}
    {props.description && (
      <div className="mb-3">
        <h3 className="text-base mb-1 leading-none">
          <span className="font-semibold">Description:</span>
        </h3>
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
      className="btn inline-block p-2 pl-3 pr-3 hover:bg-gray-3">
      Edit profile
    </Link>
  </div>
));

export default CurrentProfile;
