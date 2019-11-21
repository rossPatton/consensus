import React from 'react';

import {Decisions} from '../../../../../components';
import {tComponentProps} from './_types';

export const DecisionsComponent = (props: tComponentProps) => (
  <>
    <h2 className="mB2">Manage Decisions</h2>
    <div className="fx aiCtr p3 bgGrey1 br8 mB4 fs6 fw600">
      <label className="col row mR3" htmlFor="searchFilter">
        <div>Search:</div>
        <input
          spellCheck
          type="search"
          id="searchFilter"
          className="mR2 lh1 row"
          onChange={props.onSearchChange}
          placeholder="Search for a decision by title"
        />
      </label>
      <div>
        Filter by type
        <select
          value={props.decisionFilter}
          onBlur={props.onDecisionTypeChange}
          onChange={props.onDecisionTypeChange}>
          <option value="n/a">
            All Decisions
          </option>
          <option value="Simple Majority">
            Simple Majority
          </option>
          <option value="Approval">
            Approval
          </option>
        </select>
      </div>
    </div>
    <Decisions decisions={props.decisions} match={props.match} />
  </>
);
