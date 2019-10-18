import React, { memo } from 'react';

import { tProps } from './_types';

// TODO potentially remove that we are using dynamic imports + loadable
const GenericLoader = memo((props: tProps) => {
  if (props.isLoading) return <></>;
  return props.render();
});

export default GenericLoader;
