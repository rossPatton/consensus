import React, {memo} from 'react';

import {spacesUrl} from '~app/constants';

import {PlaceholderImage} from '..';
import {tProps} from './_types';

/**
 * @description renders the featured image for meeting lists and pages
 */
const MeetingFeaturedImage = memo((props: tProps) => (
  <>
    {props.img
      ? (
        <img
          alt={props.alt || ''}
          className="rounded w-full mFI"
          height={props.height || '240'}
          src={`${spacesUrl}/groups/${props.img}`}
          width={props.width || '480'}
        />
      ) : (
        <PlaceholderImage
          height={props.height || '240'}
          seed={props.seed}
          width={props.width || '480'}
        />
      )}
  </>
));

export default MeetingFeaturedImage;
