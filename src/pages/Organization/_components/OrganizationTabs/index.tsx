import React, {memo} from 'react';

import {Tab} from './_components';
import {tProps} from './_types';

const OrganizationTabs = memo((props: tProps) => (
  <nav className="fs5">
    <ul className="fx aiCtr ovfScr">
      <li>
        <Tab
          match={props.match}
          subRoute=""
        />
      </li>
      {(props.role === 'admin' || props.role === 'facilitator')
        && (<li>
          <Tab
            match={props.match}
            subRoute="pending"
          />
        </li>
        )}
      {(props.role === 'admin' || props.role === 'facilitator')
        && (<li>
          <Tab
            match={props.match}
            subRoute="drafts"
          />
        </li>
        )}
      {/* <li className="brdR1">
        <Tab
          match={props.match}
          role={props.role}
          subRoute="decisions"
        />
      </li>*/}
    </ul>
  </nav>
));

export default OrganizationTabs;
