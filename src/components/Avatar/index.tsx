import React, {memo} from 'react';

import {tProps} from './_types';

const prefix = 'https://seccdn.libravatar.org/avatar';

// the component half of the search filter container
// decoupled for ease of placement
const Avatar = memo((props: tProps) => {
  if (typeof props.url !== 'string') return null;

  return (
    <img
      alt={props.alt || 'User or Group Avatar'}
      height={props.size || '96'}
      className="bg-white rounded-circ ovrHide"
      src={`${prefix}/${props.url}?default=${props.type === 'group' ? 'identicon' : 'mm'}&size=${props.size}`}
      width={props.size || '96'}
    />
  );
});

export default Avatar;
