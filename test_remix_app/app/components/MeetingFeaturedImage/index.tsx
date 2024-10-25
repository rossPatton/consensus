import cx from 'classnames';
import { FunctionComponent } from 'react';

import { spacesUrl } from '~/constants';
import { getRandomNum } from '~/utils';
import { tProps } from './_types';

/**
 * @description renders the featured image for meeting lists and pages
 */
export const MeetingFeaturedImage: FunctionComponent<tProps> = props => {
  const color = getRandomNum(0, 3);

  return (
    <div className={props.className ?? ""}>
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
};
