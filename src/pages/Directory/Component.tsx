import React, { memo } from 'react';

import { Breadcrumbs } from '../../components';
import { Country, Region, City} from './_subpages';

export const DirectoryComponent = memo((props: any) => {
  const { match: { params } } = props;
  const renderCity = !!params.city;
  const renderRegion = !params.city && !!params.region;
  const renderCountry = (!renderCity && !renderRegion) && !!params.country;

  return (
    <>
      <div className="contain pT3 mB4">
        <Breadcrumbs />
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
