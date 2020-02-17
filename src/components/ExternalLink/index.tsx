import React, { memo } from 'react';

import { tProps } from './_types';

const ExternalLink = memo((props: tProps) => (
  <a
    href={props.to}
    className={props.className || ''}
    rel={`noopener noreferrer ${props.noFollow ? 'nofollow' : ''}`}>
    {props.children}
  </a>
));

export default ExternalLink;
