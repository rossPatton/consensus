import React, {memo} from 'react';

import {Decisions} from '../../../../components';
import {tProps} from './_types';

export const DecisionsComponent = memo((props: tProps) => (
  <>
    <h2 className="mB2">Decision Archive</h2>
    <Decisions decisions={props.decisions} />
  </>
));
