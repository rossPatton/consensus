import _ from 'lodash';
import React, {memo} from 'react';

import stateNameToCodeMap from '~app/json/usa/stateNameToCodeMap.json';

import {tComponentProps} from './_types';

export const CitySearchComponent = memo((props: tComponentProps) => {
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
        cityId: 0,
        region,
        regionId: 0,
      });
    }
  };

  return (
    <>
      {props.showRegionField && (
        <>
          <h2 className="text-base mb-1">
            Pick a different state
          </h2>
          <label htmlFor="stateSelect">
            <select
              name="type"
              id="stateSelect"
              className="mb-3 w-full"
              value={props.region}
              onBlur={onRegionChange}
              onChange={onRegionChange}>
              {Object.keys(stateNameToCodeMap).map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
        </>
      )}
      <h2 className="text-base">
        City in <span className="inline-block mr-2">
          {(!props.showRegionField && props.geo.region) && props.geo.region}
          {(props.showRegionField && props.region) && props.region}
        </span>
        {!props.showRegionField && (
          <button
            type="button"
            className="p-1"
            onClick={props.toggleRegionField}>
            Not the right state?
          </button>
        )}
      </h2>
      {props.label && (
        <p className="mb-1">
          {props.label}
        </p>
      )}
      <div className="mb-3">
        {props.cityId === 0 && (
          <label htmlFor="citySelect">
            <select
              name="type"
              id="citySelect"
              className="w-full"
              value={props.city}
              onBlur={onCityChange}
              onChange={onCityChange}>
              {props.cities.map((city: ts.city) => (
                <option key={city.id} value={city.name}>
                  {city.name}, {city.region}
                </option>
              ))}
            </select>
          </label>
        )}
        {props.cityId > 0 && (
          <div className="border p-2 rounded inline-block">
            <b>{props.city}</b>, <span className="inline-block mr-3">{props.region}</span>
            <button
              type="button"
              className="p-1"
              onClick={() => {
                props.updateState({
                  city: '',
                  cityId: 0,
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
