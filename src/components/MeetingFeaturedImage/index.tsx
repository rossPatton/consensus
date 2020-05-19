import React, {memo} from 'react';

import {PlaceholderImage} from '..';
import {tProps} from './_types';

const mfiPrefix = 'https://consensus.nyc3.digitaloceanspaces.com/groups';

/**
 * @description renders the featured image for meeting lists and pages
 */
const MeetingFeaturedImage = memo((props: tProps) => (
  <>
    {props.img
      ? (
        <img
          alt={props.alt || ''}
          className="rounded w-full"
          height={props.height || '240'}
          src={`${mfiPrefix}/${props.img}`}
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
