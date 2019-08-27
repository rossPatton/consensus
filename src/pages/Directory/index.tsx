import React, {memo} from 'react';

import {ErrorBoundary} from '../../containers';
import {City, Country, Region} from './_subpages';
import {tProps} from './_types';

export const Directory = memo((props: tProps) => {
  const {match: {params}} = props;
  const renderCity = !!params.city;
  const renderRegion = !params.city && !!params.region;
  const renderCountry = (!renderCity && !renderRegion) && !!params.country;

  return (
    <ErrorBoundary>
      <div className="contain pT3 mB4">
        {renderCountry && (
          <Country {...props} />
        )}
        {renderRegion && (
          <Region {...props} />
        )}
        {renderCity && (
          <City {...props} />
        )}
      </div>
    </ErrorBoundary>
  );
});
