import _ from 'lodash';
import React, {memo} from 'react';

import {CitySearch, PasswordInput} from '../../../../components';
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
        <h2 className="mb-4">New Group</h2>
      </legend>
      <h2 className="fs5 mb-1 leading-none">
          Group Name
      </h2>
      <label htmlFor="nameInput" className="mb-4">
        <p className="fs5 copyBlack mb-1">
            What&apos;s your group&apos;s name? Think carefully, you won&apos;t be able to change this!
        </p>
        <input
          required
          id="nameInput"
          name="name"
          className="w-full"
          onChange={ev => props.updateState('name', ev.currentTarget.value)}
          placeholder="Your group name here"
          value={props.name}
        />
      </label>
      <h2 className="fs5 mb-1 leading-none">
          Group Handle
      </h2>
      <label htmlFor="handleInput" className="mb-4">
        <p className="fs5 copyBlack mb-1">
            What will your group&apos;s url be? Only lowercase letters, numbers, and dashes(-) allowed. Think carefully, you won&apos;t be able to change this!
        </p>
        <div className="fx">
          <input
            required
            id="handleInput"
            name="handle"
            className="w-full mr-3"
            autoComplete="off"
            onChange={ev =>
              props.updateState('handle', slugify(ev.currentTarget.value))
            }
            placeholder="your-easily-shareable-group-url"
            value={props.handle}
          />
          <button
            type="button"
            className="p-3"
            onClick={() => {
              props.updateState('handle', slugify(props.name));
            }}>
              Make URL from group name
          </button>
        </div>
      </label>
      <h2 className="fs5 mb-1 leading-none">
          Group Category
      </h2>
      <label htmlFor="categoryInput" className="mb-4">
        <p className="fs5 copyBlack mb-1">
            What category most closely matches your group? You can always change it later. P.S., more categories are in the works!
        </p>
        <select
          required
          className="mb-4 w-full bg-white"
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
      <h2 className="fs5 mb-1 leading-none">
          Group Type
      </h2>
      <label htmlFor="groupTypeSelect">
        <p className="fs5 copyBlack mb-1">
          Is anyone free to join your group, or do you want to be able to vet membership?
        </p>
        <select
          name="type"
          id="groupTypeSelect"
          className="mb-1 w-full bg-white"
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
      <div className="text-sm black mb-4">
        {/* @TODO maybe have a mixed option here? */}
        {props.type === 'public' && 'Anyone can join, with no vetting process. Meetings are public, visible to anyone.'}
        {props.type === 'private' && 'Anyone can join, but members must be approved by a mod or admin first. Meetings are visible only to members.'}
        {props.type === 'hidden' && 'Like private, but members must be invited by the group admin or co-organizer. Group does not show in internal search results, and is hidden from search engines.'}
      </div>
      <CitySearch
        {...props}
        label="All groups on Consensus are currently local, city-based organizations."
        updateState={props.updateState}
      />
      <h2 className="fs5 mb-1 leading-none">
        Group Login
      </h2>
      <label htmlFor="loginInput" className="mb-4">
        <p className="fs5 copyBlack mb-1">
          A unique name that you&apos;ll use to login with. Keep secret!
        </p>
        <input
          required
          id="loginInput"
          name="login"
          className="w-full"
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
      <div className="brdT1 pt-4 pb-4 mt-4 flex items-center">
        <button
          disabled={props.disabled}
          className="p-3 pl-4 pR4 hover:bg-gray-11 trans1">
          Create Group!
        </button>
      </div>
    </fieldset>
  </form>
));
