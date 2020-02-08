import React, {memo} from 'react';
import {Link} from 'react-router-dom';

// import {Link} from 'react-router-dom';
// import regionMap from '../../../../json/usa/stateCodeMap.json';
// import {lowerCase, slugify} from '../../../../utils';
import {tComponentProps} from './_types';

export const OrganizationInfoComponent = memo((props: tComponentProps) => {
  // const {city: cityName} = props.org;
  // const regionString = (regionMap as {[key: string]: string})[props.org.region];
  // const region: string = lowerCase(regionString);
  // const citySlug = slugify(cityName);

  return (
    <div className="bgWhite br8 p3 mR3 c3 col growNone">
      <div className="mB3">
        <div className="fx aiCtr">
          <div>
            <div className="circ p3 mR2 bgGrey2" />
          </div>
          <div>
            <small className="ttUpper fs7">
              {props.org.category}
            </small>
            <h1 className="fs3 lh1">
              {props.org.name}
            </h1>
          </div>
        </div>
        {props.role
          && props.role !== 'pending'
          && props.members.length > 0
          && (
            <Link
              to="members"
              className="noUnderline copyBlack"
              title="Click to browse member list">
              {props.members.length} members
            </Link>
          )}
      </div>
      {/* <small className="fw600">
          Based in <Link to={`/directory/us/${region}/${citySlug}`}>
            {props.org.city}
          </Link>
        </small> */}
      <p className="fs6">
        {props.org.description.split('\n')[0]}
      </p>
      <div>
        social media links down here
      </div>
    </div>
  );
});
