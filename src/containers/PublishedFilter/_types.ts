import React from 'react';

export interface tProps {
  items: tMeeting[],
  render: (renderProps: tPublishedFilterProps) => React.ReactNode,
}

export interface tState {
  publishedFilter: tPublishedFilter,
}
