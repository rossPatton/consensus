import React from 'react';

import { tProps } from './_types';

const GenericLoader = (props: tProps) => {
  const {isLoading = true, showLoader = true} = props;

  if (isLoading) {
    if (showLoader) {
      return (
        <div className="p5 row fx jcCtr">
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
