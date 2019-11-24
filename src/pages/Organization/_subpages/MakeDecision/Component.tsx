import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from './_types';

export const CreateOrEditEventComponent = memo((props: tComponentProps) => {
  const {updateState} = props;
  const isSimplePoll = props.type === 'Simple Poll';

  return (
    <form action="/api/v1/decisions" id="form" method="POST">
      <fieldset style={{maxWidth: '760px'}}>
        <legend className="mB3">
          <h2>
            {props.isDraft && 'Edit decision'}
            {!props.isDraft && 'Make a new decision'}
          </h2>
        </legend>
        <h3>Title</h3>
        <input
          className="mB4 row"
          placeholder="A clear and concise explanation of what we're deciding"
          value={props.title}
          onChange={ev => updateState('title', ev.currentTarget.value)}
        />
        <h3>Describe the rationale for the decision here</h3>
        <textarea
          rows={8}
          spellCheck
          className="mB4 row"
          placeholder="Longer decision description and/or rationale"
          value={props.description}
          onChange={ev => updateState('description', ev.currentTarget.value)}
        />
        <h3>Is there a deadline?</h3>
        <input
          type="date"
          className="mB4 row"
          min={dayJS().toISOString()}
          value={props.date}
          placeholder="Date to finalize the results"
          onChange={ev => updateState('date', ev.currentTarget.value)}
        />
        <h3>What voting system do you want to use?</h3>
        <select
          className="row mB4 ffLab ttCap"
          onChange={ev => props.updateState('type', ev.currentTarget.value)}
          value={props.type}
        >
          <option value="Simple Poll">
            Simple Poll
          </option>
          <option value="Simple Majority">
            Simple Majority Vote
          </option>
          <option value="Approval">
            Approval Vote
          </option>
        </select>
        {!isSimplePoll && (
          <>
            <h3>What are the voting options?</h3>
            <div className="fx mB4">
              <input
                className="row mR2"
                onChange={ev => updateState('newOption', ev.currentTarget.value)}
                placeholder="Example: A candidate's name, or what day to hold a meeting."
                value={props.newOption}
              />
              <button
                type="button"
                onClick={() => updateState('options', props.newOption)}
                className="p3 mR2 hvrBgGrey1 trans1">
                Add
              </button>
            </div>
          </>
        )}
        <div className="mB4">
          {!isSimplePoll
            && props.options.length > 0
            && (
              <>
                <h3>Your selected options:</h3>
                <ul className="fs5 copyBlack">
                  {props.options.map((option, i) => (
                    <li className="brdA1 br4 fx mB2 p2" key={i}>
                      <div className="row mR3">
                        {option}
                      </div>
                      <button
                        type="button"
                        onClick={() => props.removeOption(option)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          {isSimplePoll && (
            <>
              <h3>Simple poll options</h3>
              <ul className="fs5 copyBlack">
                <li className="brdA1 br4 fx mB2 p2">
                  Yes
                </li>
                <li className="brdA1 br4 fx mB2 p2">
                  No
                </li>
                <li className="brdA1 br4 fx mB2 p2">
                  Abstain
                </li>
              </ul>
            </>
          )}
        </div>
        <div className="brdT1 pT4 pB4 mT4 fx aiCtr">
          <button
            onClick={props.onSubmit}
            disabled={!isSimplePoll && props.options.length === 0}
            className="p3 mR2 hvrBgGrey1 trans1">
            Publish
          </button>
          <button
            onClick={props.saveAsDraft}
            className="p3 mR2 hvrBgGrey1 trans1">
            Save as Draft
          </button>
          {/* TODO only show after saving as draft*/}
          {props.id && (
            <Link
              to={`/decision/${props.id}?isPreview=true`}
              className="brdA1 br4 lh1 p3 fs6 hvrBgGrey1 trans1">
              Preview
            </Link>
          )}
        </div>
      </fieldset>
    </form>
  );
});
