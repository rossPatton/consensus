import React, { memo } from 'react';
import { Breadcrumbs } from '../../../../components';
import { tComponentProps } from './_types';

export const OrganizationHeaderComponent = memo((props: tComponentProps) => {
  const {country, city, org, region} = props.params;

  const crumbs: tCrumb[] = [{
    display: props.org.country,
    to: `${country}`,
  }, {
    display: props.org.region,
    to: `${country}/${region}`,
  }, {
    display: props.org.city,
    to: `${country}/${region}/${city}`,
  }, {
    display: props.org.name,
    to: `${country}/${region}/${city}/${org}`,
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
