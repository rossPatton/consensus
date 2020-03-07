import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from '../../_types';

const CurrentProfile = memo((props: tComponentProps) => (
  <div className="rel">
    <h1 className="fs3 mB3 lh1">
      Your profile
    </h1>
    <Link className="fs7 lh1 fw600 abs t r" to={`/user/${props.session.id}`}>
      View your public profile
    </Link>
    <h2 className="fs5 mB3 lh1">
      Username: @<span className="copyBlack">
        {props.username}
      </span>
    </h2>
    {props.name && (
      <h2 className="fs5 mB3 lh1">
        Real Name: <span className="copyBlack">
          {props.name}
        </span>
      </h2>
    )}
    {props.bio && (
      <>
        <h2 className="fs5 mB1 lh1">
          Bio:
        </h2>
        <div className="mB3">
          {props.bio.split('\n').map((p, i) => (
            <p key={i}>
              {p}
            </p>
          ))}
        </div>
      </>
    )}
    {props.website && (
      <h2 className="fs5 mB3 lh1">
        Personal Website: <span className="copyBlack">
          {props.website}
        </span>
      </h2>
    )}
    {props.facebook && (
      <h2 className="fs5 mB3 lh1">
        Facebook: <span className="copyBlack">
          {props.facebook}
        </span>
      </h2>
    )}
    {props.twitter && (
      <h2 className="fs5 mB3 lh1">
        Twitter: <span className="copyBlack">
          {props.twitter}
        </span>
      </h2>
    )}
    {props.city && (
      <h2 className="fs5 mB3 lh1">
        City: <span className="copyBlack">
          {props.city}
        </span>
      </h2>
    )}
    <h2 className="fs5 mB1 lh1">
      Privacy settings
    </h2>
    <div className="fs5">
      Your RSVPs are <span className="copyBlack">
        <b>{props.privateRSVP ? 'private' : 'public'}</b>
      </span>
    </div>
    <div className="fs5 mB4">
      Your Memberships are <span className="copyBlack">
        <b>{props.privateMemberships ? 'private' : 'public'}</b>
      </span>
    </div>
    <button
      onClick={props.toggleLock}
      className="p3 pL4 pR4 hvrBgGrey1 trans1">
      Edit profile
    </button>
  </div>
));

export default CurrentProfile;
