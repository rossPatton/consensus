import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {FilterPanel} from '../../../../../components';
import {tComponentProps} from './_types';

export const MembershipsComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="fs2 mB3">
      Organizations you have joined
    </h1>
    {props.orgs.length > 1 && (
      <FilterPanel
        onSearchChange={props.onSearchChange}
        placeholder="Search for your memberships by org name"
      />
    )}
    <ul>
      {props.orgs.map((org: tOrg & {role: tRole}, i) => (
        <li
          key={i}
          className="bgWhite br8 mB3">
          <div className="fx aiCtr fs6 p2 pL3 pR3 brdB1">
            <div className="fx aiCtr col">
              <span className="ttCap mR3">
                {org.role}
              </span>
              {org.role === 'facilitator' && (
                <div>
                  <Link
                    className="mR3"
                    to={`/org/${org.id}/planMeeting`}>
                    Plan Meeting
                  </Link>
                </div>
              )}
            </div>
            <div className="col taR">
              <button
                className="bgWhite"
                onClick={ev => props.leaveOrg(ev, org.id)}>
                Leave this organization
              </button>
            </div>
          </div>
          <div className="p3">
            <h2 className="fs3 lh1 ttCap mB2">
              <Link to={`/org/${org.id}`}>
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
