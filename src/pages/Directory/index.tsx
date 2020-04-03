import React, {memo} from 'react';

import {Template} from '../../containers';
import {City, Country, Region} from './_subpages';
import {tProps} from './_types';

const Directory = memo((props: tProps) => {
  const {match: {params}} = props;
  const renderCity = !!params.city;
  const renderRegion = !params.city && !!params.region;
  const renderCountry = (!renderCity && !renderRegion) && !!params.country;

  return (
    <Template>
      <div className="contain pt-3 mb-4">
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
    </Template>
  );
});

export default Directory;
