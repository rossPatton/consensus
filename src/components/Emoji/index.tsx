import React, {memo} from 'react';

const Emoji = memo((props: {label: string, emoji: string}) => (
  <small
    role="img"
    aria-label={props.label}>
    {props.emoji}
  </small>
));

export default Emoji;
