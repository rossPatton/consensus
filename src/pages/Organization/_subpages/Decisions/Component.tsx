import React, { memo } from 'react';

import { Decisions } from '../../../../components';
import { tComponentProps } from './_types';

export const DecisionsComponent = memo((props: tComponentProps) => (
  <>
    <h2 className="mB2">Decision Archive</h2>
    <Decisions decisions={props.decisions} />
  </>
));
