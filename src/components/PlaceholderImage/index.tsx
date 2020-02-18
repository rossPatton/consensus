import React from 'react';

import {getRandomNum} from '../../utils';
import {tProps} from './_types';

const prefix = 'https://picsum.photos/id';

// the component half of the search filter container
// decoupled for ease of placement
const PlaceholderImage = (props: tProps) => (
  <img
    alt="placeholder"
    height={props.height}
    className="bgWhite br4 row"
    src={`${prefix}/${getRandomNum(1, 200)}/${props.width}/${props.height}`}
    width={props.width}
  />
);

export default PlaceholderImage;
