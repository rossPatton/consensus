import _ from 'lodash';
import React, {memo} from 'react';

import stateCodeMap from '../../json/usa/stateCodeMap.json';
import {tComponentProps} from './_types';

export const OrgSignupComponent = memo((props: tComponentProps) => {
  const onCityChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const city = _.find(props.cities, c => c.name === ev.currentTarget.value);
    if (city) {
      props.updateState({
        city: city.name,
        cityId: city.id,
        region: city.region,
        regionId: city.regionId,
      });
    }
  };

  const onRegionChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const region = ev.currentTarget.value;
    if (region !== props.region) {
      props.updateState({
        city: '',
        cityId: null,
        region,
        regionId: null,
      });
    }
  };

  return (
    <>
      {props.showRegionField && (
        <>
          <h2 className="fs5 mB1 lh1">
            Pick a different state
          </h2>
          <label htmlFor="stateSelect">
            <select
              name="type"
              id="stateSelect"
              className="mB4 row bgWhite"
              value={props.region}
              onBlur={onRegionChange}
              onChange={onRegionChange}>
              {Object.keys(stateCodeMap).map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
        </>
      )}
      <h2 className="fs5 mB1 lh1">
        City in <span className="dInBl mR2">
          {(!props.showRegionField && props.geo.region) && props.geo.region}
          {(props.showRegionField && props.region) && props.region}
        </span>
        {!props.showRegionField && (
          <button
            type="button"
            onClick={props.toggleRegionField}>
            Not the right state?
          </button>
        )}
      </h2>
      <p className="fs5 copyBlack mB1">
        All groups on Consensus are currently local, city-based organizations.
      </p>
      <div className="mB4">
        {!props.cityId && (
          <select
            name="type"
            id="stateSelect"
            className="row bgWhite"
            value={props.city}
            onBlur={onCityChange}
            onChange={onCityChange}>
            {props.cities.map((city: tCity) => (
              <option key={city.id} value={city.name}>
                {city.name}, {city.region}
              </option>
            ))}
          </select>
        )}
        {props.cityId && (
          <div className="brdA1 p3 black br8 dInBl">
            <b>{props.city}</b>, <span className="dInBl mR3">{props.region}</span>
            <button
              type="button"
              onClick={() => {
                props.updateState({
                  city: '',
                  cityId: null,
                });
              }}>
              Not the right city?
            </button>
          </div>
        )}
      </div>
    </>
  );
});