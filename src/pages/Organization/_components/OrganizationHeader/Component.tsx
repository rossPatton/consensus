import React, {memo} from 'react';

import {Breadcrumbs} from '../../../../components';
import regionMap from '../../../../json/usa/stateCodeMap.json';
import {lowerCase, slugify} from '../../../../utils';
import {tComponentProps} from './_types';

export const OrganizationHeaderComponent = memo((props: tComponentProps) => {
  const {city: cityName, slug} = props.org;
  // @ts-ignore
  const region: string = lowerCase(regionMap[props.org.region]);
  const citySlug = slugify(cityName);

  const crumbs: tCrumb[] = [{
    display: props.org.country,
    to: 'directory/us', // rn, only country supported
  }, {
    display: props.org.region,
    to: `directory/us/${region}`,
  }, {
    display: props.org.city,
    to: `directory/us/${region}/${citySlug}`,
  }, {
    display: props.org.name,
    to: `org/us/${region}/${citySlug}/${slug}`,
  }];

  return (
    <header className="bgGrey2 pT3 pB3">
      <div className="contain">
        {props.org.name && (
          <Breadcrumbs crumbs={crumbs} />
        )}
        <h1>
          {props.org.name}
        </h1>
      </div>
    </header>
  );
});
