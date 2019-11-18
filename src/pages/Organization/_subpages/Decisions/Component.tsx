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
    <Decisions decisions={props.items} match={props.match} />
  </>
));
