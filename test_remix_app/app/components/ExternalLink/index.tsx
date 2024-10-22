import { Link } from '@remix-run/react';

import { tProps } from './_types';

export const ExternalLink = (props: tProps) => (
  <Link
    to={props.to}
    target="_blank"
    className={props.className || ''}
    rel="noopener noreferrer nofollow">
    {props.children}
  </Link>
);
