import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from '../../_types';

const CurrentProfile = memo((props: tComponentProps) => (
  <div className="relative">
    <h2 className="font-semibold mb-2">
      Your profile
    </h2>
    <Link
      className="text-sm leading-none font-bold absolute t r"
      to={`/user/${props.session.profile.id}`}>
      View your public profile
    </Link>
    <h3 className="text-base mb-2 leading-none">
      <span className="font-semibold">Username:</span> @<span className="text-gray-5">
        {props.session.profile.username}
      </span>
    </h3>
    {props.session.profile.name && (
      <h3 className="text-base mb-2 leading-none">
        <span className="font-semibold">Real Name:</span> <span className="text-gray-5">
          {props.session.profile.name}
        </span>
      </h3>
    )}
    {props.session.profile.email && (
      <h3 className="text-base mb-2 leading-none">
        <span className="font-semibold">Email:</span> <span className="text-gray-5">
          {props.session.profile.email}
        </span>
      </h3>
    )}
    {props.session.profile.bio && (
      <>
        <h3 className="text-base mb-1 leading-none">
          <span className="font-semibold">Bio:</span>
        </h3>
        <div className="mb-2">
          {props.session.profile.bio.split('\n').map((p, i) => (
            <p className="mb-1" key={i}>
              {p}
            </p>
          ))}
        </div>
      </>
    )}
    {props.session.profile.website && (
      <h3 className="text-base mb-2 leading-none">
        <span className="font-semibold">Personal Website:</span> <span className="text-gray-5">
          {props.session.profile.website}
        </span>
      </h3>
    )}
    {props.session.profile.facebook && (
      <h3 className="text-base mb-2 leading-none">
        <span className="font-semibold">Facebook:</span> <span className="text-gray-5">
          {props.session.profile.facebook}
        </span>
      </h3>
    )}
    {props.session.profile.twitter && (
      <h3 className="text-base mb-2 leading-none">
        <span className="font-semibold">Twitter:</span> <span className="text-gray-5">
          {props.session.profile.twitter}
        </span>
      </h3>
    )}
    {props.session.profile.city && (
      <h3 className="text-base mb-2 pb-1 leading-none">
        <span className="font-semibold">City:</span> <span className="text-gray-5">
          {props.session.profile.city}, {props.session.profile.region}
        </span>
      </h3>
    )}
    <h3 className="font-bold text-base">
      Privacy settings
    </h3>
    <div>
      Your RSVPs are <span className="text-gray-5">
        <b>{props.session.profile.privateRSVP ? 'private' : 'public'}</b>
      </span>
    </div>
    <div className="mb-3">
      Your Memberships are <span className="text-gray-5">
        <b>{props.session.profile.privateMemberships ? 'private' : 'public'}</b>
      </span>
    </div>
    <Link
      to="/admin/profile/edit"
      className="btn inline-block p-2 pl-3 pr-3 hover:bg-gray-3 transition">
      Edit profile
    </Link>
  </div>
));

export default CurrentProfile;
