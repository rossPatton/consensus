import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';

import {PasswordInput} from '../../../../components';
import {categories} from '../../../../constants';
import {slugify} from '../../../../utils';
import {tComponentProps} from './_types';

export const OrgSignupComponent = memo((props: tComponentProps) => (
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
          What&apos;s your group&apos;s name? Must be unique. Think carefully, you won&apos;t be able to change this!
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
          What will your group&apos;s url be? Must be unique. Only lowercase letters, numbers, and dashes(-) allowed. Think carefully, you won&apos;t be able to change this!
        </p>
        <input
          required
          id="handleInput"
          name="handle"
          className="row"
          onChange={ev => props.updateState('handle', ev.currentTarget.value)}
          placeholder={slugify(props.name)}
          value={props.handle || slugify(props.name)}
        />
      </label>
      <h2 className="fs5 mB1 lh1">
        Category
      </h2>
      <label htmlFor="categoryInput" className="mB4">
        <p className="fs5 copyBlack mB1">
          What category most closely matches your group? You can always change it later. PS: more categories are in the works!
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
        {props.type === 'public' && 'Public. Anyone can join, with no vetting process at all. Meetings are public, visible to anyone.'}
        {props.type === 'private' && 'Private. Anyone can join, but members must be approved by a facilitator or admin first. Meetings are visible only to members.'}
        {props.type === 'hidden' && 'Hidden. Like private, but members must be invited by the group admin or co-organizer. Group does not show in internal search results, and is hidden from search engines.'}
      </div>
      <h2 className="fs5 mB1 lh1">
        City
      </h2>
      <p className="fs5 copyBlack mB1">
        All groups on Consensus are currently local, city-based organizations.
      </p>
      <div className="mB4">
        {!props.city && (
          <label htmlFor="cityInput" className="dBl">
            <input
              required
              id="cityInput"
              name="city"
              className="row"
              onChange={ev => {
                props.updateState('citySearch', ev.currentTarget.value);
                props.onSearchChange(ev);
              }}
              placeholder="The city your organization is located in"
              value={props.citySearch}
            />
          </label>
        )}
        {props.city && (
          <div className="brdA1 p3 black bgWhite hvrBgGrey1">
            <b>{props.city}</b>, <span className="dInBl mR3">{props.region}</span>
            <button
              type="button"
              onClick={() => {
                props.updateState(null, {
                  city: '',
                  cityId: '',
                  citySearch: '',
                  region: '',
                  regionId: '',
                });
              }}>
              Not the right city?
            </button>
          </div>
        )}
        {props.citySearch
        && props.items.length > 0
        && (
          <ul
            className="bgWhite ovfScr ovrTouch p3 bxSh1"
            style={{
              maxHeight: '200px',
              maxWidth: '760px',
            }}>
            {props.items.map((city: tCity, i) => (
              <li
                key={i}
                className={cx({
                  'pT2 pB2 fs6 black': true,
                  brdB1: props.items.length - 1 !== i,
                })}>
                <button
                  type="button"
                  className="hvrBgGrey1"
                  onClick={() => {
                    props.updateState(null, {
                      city: city.name,
                      cityId: city.id,
                      citySearch: '',
                      region: city.region,
                      regionId: city.regionId,
                    });
                  }}>
                  <span className="dInBl mR2 fw600">
                    {city.name},
                  </span>
                  {city.region}
                </button>
              </li>
            ))}
          </ul>
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
));
