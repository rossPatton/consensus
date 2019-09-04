import cx from 'classnames';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

export const MembershipsComponent = memo((props: tProps) => {
  return (
    <>
      <h1 className="fs2 mB3">
        Organizations you have joined
      </h1>
      <ul>
        {props.orgs.map((org: tOrg, i) => (
          <li
            key={i}
            className="brdA1 br8 mB3">
            <div
              className={cx({
                'fx aiCtr fs6 p2 pL3 pR3 brdB1': true,
                bgBlueLite: org.role === 'admin',
                bgGreenLite: org.role === 'member',
              })}>
              <div className="fx aiCtr col">
                <span className="ttCap mR3">
                  {org.role}
                </span>
                {org.role === 'admin' && (
                  <div>
                    <a href="filler" className="mR3">
                      Create Event
                    </a>
                    <a href="filler" className="mR3">
                      Make Decision
                    </a>
                    <a href="filler">
                      Manage Group
                    </a>
                  </div>
                )}
              </div>
              <div className="col jcEnd taR">
                <a href="filler">
                  Leave this organization
                </a>
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
    </>
  );
});
