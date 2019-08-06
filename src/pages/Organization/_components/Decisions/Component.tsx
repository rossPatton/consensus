import React, { memo } from 'react';
import { Decisions, Paginate } from '../../../../components';
import { tProps } from './_types';

export const DecisionsComponent = memo((props: tProps) => (
  <div className="contain ffLab pB5 mB5 pT3">
    <h2 className="mB3">Decision Archive</h2>
    <Decisions decisions={props.decisionsToRender} />
    <Paginate match={props.match} items={props.allDecisions} />
  </div>
));
