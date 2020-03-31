import React, {memo} from 'react';

import {tProps} from './_types';

const prefix = 'https://seccdn.libravatar.org/avatar';

// the component half of the search filter container
// decoupled for ease of placement
const Avatar = memo((props: tProps) => {
  if (typeof props.url !== 'string') return null;

  return (
    <img
      alt="User or Group Avatar"
      height="96"
      className="bgWhite circ ovrHide mR3"
      src={`${prefix}/${props.url}?default=${props.type === 'group' ? 'identicon' : 'mm'}&size=96`}
      width="96"
    />
  );
});

export default Avatar;
