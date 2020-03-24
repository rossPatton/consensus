import _ from 'lodash';
import React, {memo} from 'react';

import {PasswordInput} from '../../../../components';
import {categories} from '../../../../constants';
import stateCodeMap from '../../../../json/usa/stateCodeMap.json';
import {slugify} from '../../../../utils';
import {tComponentProps} from './_types';

export const OrgSignupComponent = memo((props: tComponentProps) => {
  const onCityChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const city = _.find(props.cities, c => c.name === ev.currentTarget.value);
    if (city) {
      props.updateState(null, {
        city: city.name,
        cityId: city.id,
        region: city.region,
        regionId: city.regionId,
      });
    }
  };

  return (
    <form
      method="POST"
      name="orgSignupForm"
      autoComplete="off"
      action="/api/v1/org"
      onSubmit={props.onSubmit}>
      <fieldset>
        <legend>
          <h2 className="mB4">New Group</h2>
        </legend>
        <h2 className="fs5 mB1 lh1">
          Group Name
        </h2>
        <label htmlFor="nameInput" className="mB4">
          <p className="fs5 copyBlack mB1">
            What&apos;s your group&apos;s name? Think carefully, you won&apos;t be able to change this!
          </p>
          <input
            required
            id="nameInput"
            name="name"
            className="row"
            onChange={ev => props.updateState('name', ev.currentTarget.value)}
            placeholder="Your group name here"
            value={props.name}
          />
        </label>
        <h2 className="fs5 mB1 lh1">
          Group Handle
        </h2>
        <label htmlFor="handleInput" className="mB4">
          <p className="fs5 copyBlack mB1">
            What will your group&apos;s url be? Only lowercase letters, numbers, and dashes(-) allowed. Think carefully, you won&apos;t be able to change this!
          </p>
          <div className="fx">
            <input
              required
              id="handleInput"
              name="handle"
              className="row mR3"
              autoComplete="off"
              onChange={ev =>
                props.updateState('handle', slugify(ev.currentTarget.value))
              }
              placeholder="your-easily-shareable-group-url"
              value={props.handle}
            />
            <button
              type="button"
              className="p3"
              onClick={() => {
                props.updateState('handle', slugify(props.name));
              }}>
              Make URL from group name
            </button>
          </div>
        </label>
        <h2 className="fs5 mB1 lh1">
          Group Category
        </h2>
        <label htmlFor="categoryInput" className="mB4">
          <p className="fs5 copyBlack mB1">
            What category most closely matches your group? You can always change it later. P.S., more categories are in the works!
          </p>
          <select
            required
            className="mB4 row bgWhite"
            defaultValue={props.category}
            onBlur={ev => props.updateState('category', ev.currentTarget.value)}
            onChange={ev => props.updateState('category', ev.currentTarget.value)}>
            {categories.map(({display}) => (
              <option key={display} value={display}>
                {display}
              </option>
            ))}
          </select>
        </label>
        <h2 className="fs5 mB1 lh1">
          Group Type
        </h2>
        <label htmlFor="groupTypeSelect">
          <p className="fs5 copyBlack mB1">
            Is anyone free to join your group, or do you want to be able to vet membership?
          </p>
          <select
            name="type"
            id="groupTypeSelect"
            className="mB1 row bgWhite"
            value={props.type}
            onBlur={ev => props.updateState('type', ev.currentTarget.value)}
            onChange={ev => props.updateState('type', ev.currentTarget.value)}>
            <option value="public">
            Public
            </option>
            <option value="private">
            Private
            </option>
            <option value="hidden">
            Hidden
            </option>
          </select>
        </label>
        <div className="fs6 black mB4">
          {/* @TODO maybe have a mixed option here? */}
          {props.type === 'public' && 'Anyone can join, with no vetting process. Meetings are public, visible to anyone.'}
          {props.type === 'private' && 'Anyone can join, but members must be approved by a mod or admin first. Meetings are visible only to members.'}
          {props.type === 'hidden' && 'Like private, but members must be invited by the group admin or co-organizer. Group does not show in internal search results, and is hidden from search engines.'}
        </div>
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
                onBlur={ev => props.updateState('region', ev.currentTarget.value)}
                onChange={ev => props.updateState('region', ev.currentTarget.value)}>
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
              onClick={() =>
                props.updateState('showRegionField', !props.showRegionField)
              }>
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
            <div className="brdA1 p3 black bgWhite br8 dInBl">
              <b>{props.city}</b>, <span className="dInBl mR3">{props.region}</span>
              <button
                type="button"
                onClick={() => {
                  props.updateState(null, {
                    city: '',
                    cityId: '',
                  });
                }}>
                Not the right city?
              </button>
            </div>
          )}
        </div>
        <h2 className="fs5 mB1 lh1">
          Group Login
        </h2>
        <label htmlFor="loginInput" className="mB4">
          <p className="fs5 copyBlack mB1">
          A unique name that you&apos;ll use to login with. Keep secret!
          </p>
          <input
            required
            id="loginInput"
            name="login"
            className="row"
            autoComplete="off"
            onChange={ev => props.updateState('login', ev.currentTarget.value)}
            placeholder="YourSecretGroupLoginHere"
            value={props.login}
          />
        </label>
        <PasswordInput
          required
          newPassword
          id="password"
          title="Group Password"
          onChange={ev => props.updateState('password', ev.currentTarget.value)}
          placeholder="Your organization's password here"
          password={props.password}
        />
        <div className="brdT1 pT4 pB4 mT4 fx aiCtr">
          <button
            disabled={props.disabled}
            className="p3 pL4 pR4 hvrBgGrey1 trans1">
            Create Group!
          </button>
        </div>
      </fieldset>
    </form>
  );
});
