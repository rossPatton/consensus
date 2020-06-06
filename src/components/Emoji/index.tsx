import React, {memo} from 'react';

const Emoji = memo((props: {className?: string, emoji: string, label: string}) => (
  <small
    role="img"
    className={props.className || ''}
    aria-label={props.label}>
    {props.emoji}
  </small>
));

export default Emoji;
