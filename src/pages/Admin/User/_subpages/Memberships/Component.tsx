import cx from 'classnames';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from './_types';

export const MembershipsComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="fs2 mB3">
      Organizations you have joined
    </h1>
    <label
      htmlFor="searchFilter"
      className="fx aiCtr p3 bgGrey1 br8 mB4">
      <input
        spellCheck
        type="search"
        id="searchFilter"
        className="mR2 lh1 row"
        onChange={props.onSearchChange}
        placeholder="Search for an organization by name"
      />
    </label>
    <ul>
      {props.orgs.map((org: tOrg & {role: tRole}, i) => (
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
              {org.role === 'facilitator' && (
                <div>
                  <Link
                    className="mR3"
                    to={`/org/${org.id}/createEvent`}>
                    Create Event
                  </Link>
                  <Link
                    className="mR3"
                    to={`/org/${org.id}/makeDecision`}>
                    Make Decision
                  </Link>
                </div>
              )}
            </div>
            <div className="col taR">
              <button
                className="bgWhite"
                onClick={ev => props.deleteOrgByUser(ev, org.id)}>
                Leave this organization
              </button>
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
));
