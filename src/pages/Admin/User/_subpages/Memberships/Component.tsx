import _ from 'lodash';
import React, {memo} from 'react';

// import {Link} from 'react-router-dom';
import {FilterPanel, Orgs} from '../../../../../components';
import {tComponentProps} from './_types';

export const MembershipsComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="fs3 mB3">
      All your groups
    </h1>
    <FilterPanel
      className="fx aiCtr mB4 fs6 fw600"
      onSearchChange={props.onSearchChange}
      placeholder="Search for a group by name"
    />
    <Orgs asList isEditable orgs={props.orgs} />
    {/* <ul>
      {props.orgs.map((org, i) => {
        const {role} = _.find(props.roles, roleMap => roleMap.orgId === org.id);

        return (
          <li
            key={i}
            className="mB3">
            <div className="fx aiCtr fs6 p2 pL3 pR3 brdB1">
              <div className="fx aiCtr col">
                <span className="ttCap mR3">
                  {role}
                </span>
                {role === 'facilitator' && (
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
                  Leave this group
                </button>
              </div>
            </div>
            <div className="p3">
              <h2 className="fs3 lh1 ttCap mB2">
                <Link to={`/org/${org.id}`}>
                  {org.name}
                </Link>
              </h2>
            </div>
          </li>
        );
      })}
    </ul> */}
  </>
));
