import React from 'react';

import { tProps } from './_types';

const GenericLoader = (props: tProps) => {
  const {isLoading, showLoader = true} = props;

  if (isLoading) {
    if (showLoader) {
      return (
        <div className="p-3 w-full flex justify-center">
          <div className="loading">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      );
    }

    return null;
  }

  return props.render();
};

export default GenericLoader;
