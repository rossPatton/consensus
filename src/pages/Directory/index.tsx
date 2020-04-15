import React, {memo} from 'react';

import {Template} from '../../containers';
import {City, Country, Region} from './_subpages';
import {tProps} from './_types';

const Directory = memo((props: tProps) => {
  const {match: {params}} = props;
  const renderCity = !!params.city;
  const renderRegion = !params.city && !!params.regionCode;
  const renderCountry = (!renderCity && !renderRegion) && !!params.countryCode;

  return (
    <Template>
      {renderCountry && (
        <Country {...props} />
      )}
      {renderRegion && (
        <Region {...props} />
      )}
      {renderCity && (
        <City {...props} />
      )}
    </Template>
  );
});

export default Directory;
