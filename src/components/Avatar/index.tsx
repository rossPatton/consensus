import cx from 'classnames';
import React, {memo} from 'react';

import {tProps} from './_types';
const avPrefix = 'https://consensus.nyc3.digitaloceanspaces.com';

const Avatar = memo((props: tProps) => {
  const {className, hash, size = 'lg'} = props;
  const src = `${avPrefix}/${props.type || 'groups'}/${hash || null}`;

  return (
    <div
      className={cx({
        'rounded overflow-hidden': true,
        'av-sz-sm': size === 'sm',
        'av-sz-lg': size === 'lg',
        'bg-gray-2': !hash,
        'mr-1': typeof className !== 'string',
        [className]: typeof className === 'string',
      })}>
      {hash && (
        <img
          alt={props.alt || 'User or Group Avatar'}
          height={size === 'sm' ? '40' : '60'}
          src={src}
          width={size === 'sm' ? '40' : '60'}
        />
      )}
    </div>
  );
});

export default Avatar;
