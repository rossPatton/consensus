import React, { memo } from 'react';

import { tProps } from './_types';

export const GenericLoader = memo((props: tProps) => {
  if (props.isLoading) return <></>;
  return props.render();
});
