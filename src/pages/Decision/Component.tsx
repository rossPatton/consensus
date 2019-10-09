import dayJS from 'dayjs';
import pluralize from 'pluralize';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Decisions} from '../../components';
import {tComponentProps} from './_types';

export const DecisionComponent = memo(({decision, decisions}: tComponentProps) => (
  <div className="contain mT4 mB5">
    <small className="fx fw600 lh1 mB3">
      <time className="mR1" dateTime={decision.date}>
        {dayJS(decision.date).format('ddd MMM DD, h:mmA')}
      </time>
    </small>
    <h1 className="mB3 pB3 brdB1 ttCap">
      {decision.title}
    </h1>
    <div className="fx mB3">
      <div className="col row mR3">
        {/* <div className="bgGrey1 mB3">
          <img
            alt=""
            className="row"
            height="175"
            width="175"
            src="https://via.placeholder.com/760x428"
          />
        </div>
      */}
        {decision.description &&
          decision.description.split('\n').map((p: string, i) => (
            <p key={i} className="fs3">
              {p}
            </p>
          ))}
      </div>
      <aside>
        {decisions && decisions.length > 0 && (
          <>
            <h2 className="fs5 mB3 ffLab lh1">
              {/* More by <Link to={`/org/${decision.orgId}/overview`}>{decision.orgName}</Link> */}
            </h2>
            <Decisions decisions={decisions} />
          </>
        )}
      </aside>
    </div>
  </div>
));
