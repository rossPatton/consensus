import cx from 'classnames';
import React, {memo} from 'react';

import {spacesUrl} from '~app/constants';

import {tProps} from './_types';

const Avatar = memo((props: tProps) => {
  const {className, hash, size = 'lg', type = 'groups'} = props;

  // hash === account uploaded an avatar/logo to DO and we want to use that
  let src = '';
  if (typeof hash === 'string') {
    if (hash.length === 1) {
      src = `/images/av/${hash}.svg`;
    } else {
      src = `${spacesUrl}/${type}/${hash}`;
    }
  }

  return (
    <div
      className={cx({
        'bg-gray-1 rounded-circ overflow-hidden': true,
        'av-sz-sm': size === 'sm',
        'av-sz-lg': size === 'lg',
        'mr-1': typeof className !== 'string',
        [className]: typeof className === 'string',
      })}>
      {src && (
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
