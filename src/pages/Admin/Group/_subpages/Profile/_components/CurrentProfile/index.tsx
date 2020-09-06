import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Description} from '~app/components';

import {tComponentProps} from '../../_types';

const CurrentProfile = memo((props: tComponentProps) => (
  <div className="relative">
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
        {props.session.profile.handle}
      </span>
    </h3>
    <h3 className="text-base mb-2 leading-none">
      <span className="font-semibold">Group Type:</span> <span className="text-gray-5 capitalize">
        {props.session.profile.type}
      </span>
    </h3>
    <h3 className="text-base mb-2 leading-none">
      <span className="font-semibold">Category:</span> <span className="text-gray-5">
        {props.session.profile.category}
      </span>
    </h3>
    {props.session.profile.city && (
      <h3 className="text-base mb-2 pb-1 leading-none">
        <span className="font-semibold">Based in:</span> <span className="text-gray-5">
          {props.session.profile.city}, {props.session.profile.region}
        </span>
      </h3>
    )}
    <h3 className="text-base mb-2 leading-none">
      <span className="font-semibold">Member title:</span> <span className="text-gray-5">
        {props.session.profile.memberName}
      </span>
    </h3>
    <h3 className="text-base mb-2 leading-none">
      <span className="font-semibold">Moderator title:</span> <span className="text-gray-5">
        {props.session.profile.modName}
      </span>
    </h3>
    {props.session.profile.website && (
      <h3 className="text-base mb-2 leading-none">
        <span className="font-semibold">Group Website</span> <span className="text-gray-5">
          {props.session.profile.website}
        </span>
      </h3>
    )}
    {props.session.profile.facebook && (
      <h3 className="text-base mb-2 leading-none">
        <span className="font-semibold">Facebook</span> <span className="text-gray-5">
          {props.session.profile.facebook}
        </span>
      </h3>
    )}
    {props.session.profile.twitter && (
      <h3 className="text-base mb-2 leading-none">
        <span className="font-semibold">Twitter</span> <span className="text-gray-5">
          {props.session.profile.twitter}
        </span>
      </h3>
    )}
    {props.session.profile.description && (
      <div className="mb-3">
        <h3 className="text-base mb-1 leading-none">
          Description
        </h3>
        <Description
          description={props.session.profile.description}
        />
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
