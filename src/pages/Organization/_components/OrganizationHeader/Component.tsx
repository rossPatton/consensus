import React, { memo } from 'react';

import { Breadcrumbs } from '../../../../components';
import { tComponentProps } from './_types';

export const OrganizationHeaderComponent = memo((props: tComponentProps) => {
  const {country, city, slug, region} = props.params;

  const crumbs: tCrumb[] = [{
    display: props.org.country,
    to: `directory/${country}`,
  }, {
    display: props.org.region,
    to: `directory/${country}/${region}`,
  }, {
    display: props.org.city,
    to: `directory/${country}/${region}/${city}`,
  }, {
    display: props.org.name,
    to: `org/${country}/${region}/${city}/${slug}`,
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
