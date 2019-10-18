import React, {memo} from 'react';

import {tProps} from './_types';

const SimpleMajorityVote = memo((props: tProps) => (
  <form>
    <fieldset>
      <legend className="mB2 fs4">
        Choices:
      </legend>
      <ul className="fs6 fw600 lh1">
        {props.choices.map((choice, i) => (
          <li
            key={i}
            className="mB3 ttCap">
            <button className="row p3 taL hvrBgGrey1 trans1">
              <input
                type="checkbox"
                className="mR2"
                autoComplete="nope"
                checked={false}
              />
              {choice}
            </button>
          </li>
        ))}
        <li>
          <button className="p3 taL hvrBgGrey1 trans1">
            Submit your vote
          </button>
        </li>
      </ul>
    </fieldset>
  </form>
));

export default SimpleMajorityVote;
