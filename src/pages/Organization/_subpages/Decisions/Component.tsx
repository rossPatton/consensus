import React, { memo } from 'react';
import { Decisions, Paginate } from '../../../../components';
import { tComponentProps } from './_types';

export const DecisionsComponent = memo((props: tComponentProps) => (
  <>
    <h2 className="mB2">Decision Archive</h2>
    <Decisions decisions={props.decisionsToRender} />
    <Paginate match={props.match} items={props.allDecisions} />
  </>
));
