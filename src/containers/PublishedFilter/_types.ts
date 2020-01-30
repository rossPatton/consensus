import React from 'react';

export interface tProps {
  items: tEvent[],
  render: (renderProps: tPublishedFilterProps) => React.ReactNode,
}

export interface tState {
  publishedFilter: tPublishedFilter,
}
