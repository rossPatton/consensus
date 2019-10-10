import cx from 'classnames';
import React, {memo} from 'react';

import {tProps} from './_types';

export const SimpleMajorityVote = memo((props: tProps) => {
  return (
    <form>
      <fieldset>
        <legend>
          Choices:
        </legend>
        <ul className="fs6 fw600 lh1 mB3">
          {props.choices.map((choice, i) => (
            <li key={i}>
              {choice}
            </li>
          ))}
        </ul>
      </fieldset>
    </form>
  );
});
