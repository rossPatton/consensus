import React from 'react';

import {getRandomNum} from '../../utils';
import {tProps} from './_types';

// the component half of the search filter container
// decoupled for ease of placement
const PlaceholderImage = (props: tProps) => {
  let prefix = 'https://picsum.photos/id';
  let index = getRandomNum(1, 200);
  if (props.seed) {
    prefix = 'https://picsum.photos/seed';
    index = props.seed;
  }

  return (
    <img
      alt="placeholder"
      height={props.height}
      className="bg-white br4 w-full"
      src={`${prefix}/${index}/${props.width}/${props.height}`}
      width={props.width}
    />
  );
};

export default PlaceholderImage;
