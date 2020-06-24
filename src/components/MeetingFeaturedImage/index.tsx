import cx from 'classnames';
import React, {memo} from 'react';

import {spacesUrl} from '~app/constants';
import {getRandomNum} from '~app/utils';

import {tProps} from './_types';

/**
 * @description renders the featured image for meeting lists and pages
 */
const MeetingFeaturedImage = memo((props: tProps) => {
  const color = getRandomNum(0, 3);

  return (
    <>
      {props.img
        ? (
          <img
            alt={props.alt || ''}
            className="w-full mFI mb-1"
            height={props.height || '240'}
            src={`${spacesUrl}/groups/${props.img}`}
            width={props.width || '480'}
          />
        ) : (
          <div
            className={cx({
              'rounded placeholder mb-1': true,
              'bg-peach': color === 0,
              'bg-forest': color === 1,
              'bg-sky': color === 2,
              'bg-cherry': color === 3,
            })}
          />
        )}
    </>
  );
});

export default MeetingFeaturedImage;
