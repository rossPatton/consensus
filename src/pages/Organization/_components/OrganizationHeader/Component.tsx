import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import regionMap from '../../../../json/usa/stateCodeMap.json';
import {lowerCase, slugify} from '../../../../utils';
import {tComponentProps} from './_types';

export const OrganizationHeaderComponent = memo((props: tComponentProps) => {
  const {city: cityName} = props.org;
  const regionString = (regionMap as {[key: string]: string})[props.org.region];
  const region: string = lowerCase(regionString);
  const citySlug = slugify(cityName);

  return (
    <header className="bgGrey2 pT3 pB3">
      <div className="contain">
        <div className="fs6 fw600 mB2">
          Based in <Link to={`/directory/us/${region}/${citySlug}`}>
            {props.org.city}
          </Link>
        </div>
        <h1>
          {props.org.name}
        </h1>
      </div>
    </header>
  );
});
