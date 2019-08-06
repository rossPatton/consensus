import React, { memo } from 'react';
import { tProps } from './types';

export const GenericLoader = memo((props: tProps) => {
  if (props.isLoading) return <>Loading</>;
  return props.render();
});
