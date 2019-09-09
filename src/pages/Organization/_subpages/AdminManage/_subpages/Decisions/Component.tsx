import React, { memo } from 'react';

import {Decisions} from '../../../../../../components';
import {tComponentProps} from './_types';

export const DecisionsComponent = memo((props: tComponentProps) => (
  <>
    <h2 className="mB2">Manage Decisions</h2>
    <label
      htmlFor="searchFilter"
      className="fx aiCtr p3 bgGrey1 br8 mB4">
      <input
        spellCheck
        type="search"
        id="searchFilter"
        className="mR2 lh1 row"
        onChange={props.onSearchChange}
        placeholder="Search for a decision by title"
      />
    </label>
    <Decisions decisions={props.decisions} />
  </>
));
