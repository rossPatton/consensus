import React, {memo} from 'react';

import {tComponentProps} from './_types';

export const SimpleMajorityVoteComponent = memo((props: tComponentProps) => (
  <form method="POST">
    <fieldset>
      <legend className="mB2 fs4">
        Choices:
      </legend>
      <ul className="fs6 fw600 lh1">
        {props.options.map((option, i) => (
          <li
            key={i}
            className="mB3 ttCap">
            <button
              disabled={props.userVoted && props.selectedOption !== option}
              value={option}
              onClick={props.selectOption}
              className="row p3 taL hvrBgGrey1 trans1">
              <input
                readOnly
                autoComplete="nope"
                checked={option === props.selectedOption}
                className="mR2"
                type="checkbox"
              />
              {option}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={props.userVoted}
            className="p3 taL hvrBgGrey1 trans1"
            onClick={ev => {
              ev.preventDefault();
              props.submitVote(props.selectedOption);
            }}>
            {props.userVoted ? 'Thanks for your vote!' : 'Submit your vote'}
          </button>
        </li>
      </ul>
    </fieldset>
  </form>
));
