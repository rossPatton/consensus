import React, { memo } from 'react';

import { tProps } from './_types';

const ExternalLink = memo((props: tProps) => (
  <a
    href={props.to}
    target="_blank"
    className={props.className || ''}
    rel="noopener noreferrer nofollow">
    {props.children}
  </a>
));

export default ExternalLink;
