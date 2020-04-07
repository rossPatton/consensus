import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from '../../_types';

const CurrentProfile = memo((props: tComponentProps) => (
  <div className="relative">
    <h1 className="text-2 mb-2">
      Your profile
    </h1>
    <Link
      className="text-sm leading-none font-bold absolute t r"
      to={`/user/${props.session.id}`}>
      View your public profile
    </Link>
    <h2 className="text-base mb-2 leading-none">
      Username: @<span className="text-gray-5">
        {props.username}
      </span>
    </h2>
    {props.name && (
      <h2 className="text-base mb-2 leading-none">
        Real Name: <span className="text-gray-5">
          {props.name}
        </span>
      </h2>
    )}
    {props.bio && (
      <>
        <h2 className="text-base mb-1 leading-none">
          Bio:
        </h2>
        <div className="mb-2">
          {props.bio.split('\n').map((p, i) => (
            <p className="mb-1" key={i}>
              {p}
            </p>
          ))}
        </div>
      </>
    )}
    {props.website && (
      <h2 className="text-base mb-2 leading-none">
        Personal Website: <span className="text-gray-5">
          {props.website}
        </span>
      </h2>
    )}
    {props.facebook && (
      <h2 className="text-base mb-2 leading-none">
        Facebook: <span className="text-gray-5">
          {props.facebook}
        </span>
      </h2>
    )}
    {props.twitter && (
      <h2 className="text-base mb-2 leading-none">
        Twitter: <span className="text-gray-5">
          {props.twitter}
        </span>
      </h2>
    )}
    {props.city && (
      <h2 className="text-base mb-2 pb-1 leading-none">
        City: <span className="text-gray-5">
          {props.city}
        </span>
      </h2>
    )}
    <h2 className="text-base">
      Privacy settings
    </h2>
    <div>
      Your RSVPs are <span className="text-gray-5">
        <b>{props.privateRSVP ? 'private' : 'public'}</b>
      </span>
    </div>
    <div className="mb-3">
      Your Memberships are <span className="text-gray-5">
        <b>{props.privateMemberships ? 'private' : 'public'}</b>
      </span>
    </div>
    <Link
      to="/admin/profile/edit"
      className="btn p-2 pl-3 pr-3 hover:bg-gray-3 transition">
      Edit profile
    </Link>
  </div>
));

export default CurrentProfile;
