import React from 'react';

type tRender = {
  items: any[],
  onPublishedFilterChange: Function,
  publishedFilter: tPublishedFilter,
};

export interface tProps {
  items: any[],
  render: (renderProps: tRender) => React.ReactNode,
}

export interface tState {
  publishedFilter: tPublishedFilter,
}
