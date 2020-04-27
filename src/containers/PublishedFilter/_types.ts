import React from 'react';

export interface tProps {
  items: ts.meeting[],
  render: (renderProps: ts.publishedFilterProps) => React.ReactNode,
}

export interface tState {
  publishedFilter: ts.filterEnum,
}
