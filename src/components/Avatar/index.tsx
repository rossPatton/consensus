import cx from 'classnames';
import React, {memo} from 'react';

import {tProps} from './_types';
const avPrefix = 'https://consensus.nyc3.digitaloceanspaces.com';

const Avatar = memo((props: tProps) => {
  const src = `${avPrefix}/${props.type || 'groups'}/${props.hash || null}`;

  return (
    <div
      className={cx({
        'rounded oveflow-hidden': true,
        'mr-1': typeof props.className !== 'string',
        'p-3 bg-gray-2': !props.hash,
        [props.className]: typeof props.className === 'string',
      })}>
      {props.hash && (
        <img
          alt={props.alt || 'User or Group Avatar'}
          height={props.size || '60'}
          src={src}
          width={props.size || '60'}
        />
      )}
    </div>
  );
});

export default Avatar;
