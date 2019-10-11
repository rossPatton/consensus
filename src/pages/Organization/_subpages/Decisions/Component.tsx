import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Decisions} from '../../../../components';
import {tComponentProps} from './_types';

export const DecisionsComponent = memo((props: tComponentProps) => (
  <>
    <div className="fx aiCtr mB2">
      <h2 className="col row">
        {props.isClosed && 'Decision Archive'}
        {!props.isClosed && 'Active Decisions'}
      </h2>
      <Link
        className="col row fs6 taR"
        to={`${props.pathname}?isClosed=${!props.isClosed}`}>
        {props.isClosed && 'See active decisions'}
        {!props.isClosed && 'See past decisions'}
      </Link>
    </div>
    <Decisions decisions={props.decisions} />
  </>
));
