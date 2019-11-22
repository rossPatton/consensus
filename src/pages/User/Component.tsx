import cx from 'classnames';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

export const UserComponent = memo(({orgs, user}: tProps) => (
  <div className="contain mT4 mB5">
    {(user.name || user.username) && (
      <h1 className="mB3 fs2 ttCap">
        {/* if user entered a name, use those, otherwise use username*/}
        Profile for {!user.privateName && user.name}
        {(user.privateName || !user.name) && user.username}
      </h1>
    )}
    {user.name
      && !user.privateName
      && (
        <>
          <h3>Username:</h3>
          <p>{user.username}</p>
        </>
      )}
    {user.email && (
      <>
        <h3>Email:</h3>
        <p>{user.email}</p>
      </>
    )}
    {user.bio && (
      <div className="row">
        <h3>Bio:</h3>
        {user.bio && user.bio.split('\n').map((p, i) => (
          <p key={i} className="copyBlack">{p}</p>
        ))}
      </div>
    )}
    {orgs
      && orgs.length > 0
      && (
        <div className="row">
          <h3>Organization Memberships:</h3>
          <ul>
            {orgs.map((org: tOrg & {role: tRole}, i) => (
              <li
                key={i}
                className="brdA1 br8 mB3">
                <div
                  className={cx({
                    'fx aiCtr fs6 p2 pL3 pR3 brdB1': true,
                    bgYellowLite: org.role === 'member',
                    bgGreenLite: org.role === 'facilitator',
                  })}>
                  <div className="fx aiCtr col">
                    <span className="ttCap mR3">
                      {org.role}
                    </span>
                  </div>
                </div>
                <div className="p3">
                  <h2 className="fs3 lh1 ttCap mB2">
                    <Link to={`/org/${org.id}/overview`}>
                      {org.name}
                    </Link>
                  </h2>
                  <p className="lineClamp">
                    {org.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
  </div>
));
