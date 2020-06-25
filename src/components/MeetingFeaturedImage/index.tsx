import cx from 'classnames';
import React, {FunctionComponent, memo} from 'react';

import {spacesUrl} from '~app/constants';
import {getRandomNum} from '~app/utils';

import {tProps} from './_types';

/**
 * @description renders the featured image for meeting lists and pages
 */
const MeetingFeaturedImage: FunctionComponent<tProps> = memo(props => {
  const color = getRandomNum(0, 3);

  return (
    <div
      className={cx({
        [props.className]: typeof props.className === 'string',
      })}>
      {props.img
        ? (
          <img
            alt={props.alt || ''}
            className="w-full"
            height={props.height || '240'}
            src={`${spacesUrl}/groups/${props.img}`}
            width={props.width || '480'}
          />
        ) : (
          <div
            className={cx({
              'rounded placeholder': true,
              'bg-peach-2': color === 0,
              'bg-forest': color === 1,
              'bg-sky': color === 2,
              'bg-cherry': color === 3,
            })}
          />
        )}
    </div>
  );
});

export default MeetingFeaturedImage;
