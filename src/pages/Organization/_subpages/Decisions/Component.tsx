import React, {memo} from 'react';

import {Decisions} from '../../../../components';
import {decisionTypes} from '../../../../constants';
import {tComponentProps} from './_types';

export const DecisionsComponent = memo((props: tComponentProps) => (
  <>
    <div className="fx aiCtr mB2">
      <h2 className="col">
        {props.showClosed && 'Decision Archive'}
        {!props.showClosed && 'Active Decisions'}
      </h2>
      <button
        onClick={props.toggleClosed}
        className="trans1 hvrBgGrey1">
        {props.showClosed && 'See active decisions'}
        {!props.showClosed && 'See past decisions'}
      </button>
    </div>
    <div className="fx aiCtr p3 bgGrey1 br8 mB4 fs6 fw600">
      <label className="col row mR3" htmlFor="searchFilter">
        <div>Search</div>
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
          {decisionTypes.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
    <Decisions decisions={props.items} match={props.match} />
  </>
));
