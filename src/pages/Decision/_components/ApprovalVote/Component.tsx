import React, {memo} from 'react';

import {tComponentProps} from './_types';

export const ApprovalVoteComponent = memo((props: tComponentProps) => (
  <form>
    <fieldset>
      <legend className="mB2 fs4">
        Choices:
      </legend>
      <ul className="fs6 fw600 lh1">
        {props.options.map((choice, i) => (
          <li
            key={i}
            className="mB3 ttCap">
            <button
              type="button"
              value={choice}
              onClick={props.selectOption}
              className="row p3 taL hvrBgGrey1 trans1">
              <input
                autoComplete="nope"
                checked={props.selectedOptions.includes(choice)}
                className="mR2"
                onChange={() => {}}
                readOnly
                type="checkbox"
              />
              {choice}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={props.userVoted}
            className="p3 taL hvrBgGrey1 trans1"
            onClick={ev => {
              ev.preventDefault();
              props.submitVote(props.selectedOptions);
            }}>
            {props.userVoted ? 'Thanks for your vote!' : 'Submit your vote'}
          </button>
        </li>
      </ul>
    </fieldset>
  </form>
));
