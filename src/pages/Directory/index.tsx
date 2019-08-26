import React, {memo} from 'react';
import {Breadcrumbs} from '../../components';
import {tProps} from './_types';
import {Country, Region, City} from './_subpages';

export const Directory = memo((props: tProps) => {
  const {match: {params}} = props;
  const renderCity = !!params.city;
  const renderRegion = !params.city && !!params.region;
  const renderCountry = (!renderCity && !renderRegion) && !!params.country;

  return (
    <>
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
    </>
  );
});
