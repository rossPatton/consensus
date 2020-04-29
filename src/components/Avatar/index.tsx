import cx from 'classnames';
import React, {memo} from 'react';

import {tProps} from './_types';
const prefix = 'https://seccdn.libravatar.org/avatar';

const Avatar = memo((props: tProps) => (
  <div
    className={cx({
      'mr-1': typeof props.className !== 'string',
      'bg-white border p-3 rounded': !props.hash,
      [props.className]: typeof props.className === 'string',
    })}>
    {props.hash && (
      <img
        alt={props.alt || 'User or Group Avatar'}
        height={props.size || '96'}
        src={`${prefix}/${props.hash}?default=${props.type === 'group' ? 'identicon' : 'mm'}&size=${props.size}`}
        width={props.size || '96'}
      />
    )}
  </div>
));

export default Avatar;
