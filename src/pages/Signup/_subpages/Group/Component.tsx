import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {CitySearch, PasswordInput} from '~app/components';
import {categories} from '~app/constants';
import {slugify} from '~app/utils';

import {tComponentProps} from './_types';

export const GroupSignupComponent = memo((props: tComponentProps) => (
  <form
    name="orgSignupForm"
    autoComplete="off"
    onSubmit={props.onSubmit}>
    <fieldset>
      <legend>
        <h1 className="mb-3">New Group</h1>
      </legend>
      <h2 className="font-semibold text-base">
        Group Name
      </h2>
      <label htmlFor="nameInput" className="mb-3">
        <p className="text-base text-gray-5 mb-1">
          What&apos;s your group&apos;s name? Think carefully, you won&apos;t be able to change this! Must be unique.
        </p>
        <input
          required
          id="nameInput"
          name="name"
          type="text"
          className="w-full"
          onChange={ev => {
            props.updateState('name', ev.currentTarget.value);
            props.updateState('handle', slugify(ev.currentTarget.value));
          }}
          placeholder="Your group name here"
          value={props.name}
        />
      </label>
      <h2 className="font-semibold text-base">
        Group URL Preview
      </h2>
      <p className="text-base text-gray-5 mb-1">
        Your group&apos;s url is generated based on your group name. Here&apos;s a preview.
      </p>
      <div className="font-semibold bg-gray-1 border inline-block mb-3 p-1 rounded">
        {`https://consens.us.org/group/${props.handle}`}
      </div>
      <h2 className="font-semibold text-base mb-1 leading-none">
        Group Email address
      </h2>
      <label className="w-full mb-2" htmlFor="emailInput">
        <p className="text-base text-gray-5 mb-1">
          Used for account verification.
        </p>
        <input
          id="emailInput"
          onChange={ev => props.updateState('email', ev.currentTarget.value)}
          className="p-2 w-full"
          autoComplete="off"
          placeholder="yourGroupEmail@example.com"
          value={props.email}
          name="email"
        />
      </label>
      <h2 className="font-semibold text-base">
        Group Category
      </h2>
      <label htmlFor="categoryInput" className="mb-3">
        <p className="text-base text-gray-5 mb-1">
          What category most closely matches your group? You can always change it later. P.S., more categories are in the works!
        </p>
        <select
          required
          className="mb-3 w-full bg-white"
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
      <h2 className="font-semibold text-base">
        Group Type
      </h2>
      <label htmlFor="groupTypeSelect">
        <p className="text-base text-gray-5 mb-1">
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
      <div className="text-sm mb-3">
        {/* @TODO maybe have a mixed option here? */}
        {props.type === 'public' && 'Anyone can join, with no vetting process. Meetings are public, visible to anyone.'}
        {props.type === 'private' && 'Anyone can join, but members must be approved by a mod or admin first. Meetings are visible only to members.'}
        {props.type === 'hidden' && 'Like private, but members must be invited by the group admin or co-organizer. Group does not show in internal search results, and is hidden from search engines.'}
      </div>
      <CitySearch
        {...props}
        label="All groups on Consensus are currently local, city-based organizations."
        showRemoveButton={false}
        updateState={props.updateState}
      />
      <h2 className="text-base mb-1 font-semibold">
        <b>Private</b> Group Login
      </h2>
      <p className="mb-1">
        A unique name or phrase that you&apos;ll only use to login with. No one else will see this. Can be changed at any time. Keep secret!
      </p>
      <label htmlFor="loginInput" className="mb-3">
        <input
          required
          id="loginInput"
          minLength={3}
          name="login"
          type="text"
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
      <div className="flex">
        <button
          disabled={props.disabled}
          className="p-2 pl-3 pr-3 hover:bg-gray-3 mr-1">
          Create Group!
        </button>
        <Link
          to="/signup"
          className="btn hover:bg-gray-3 p-2 pl-3 pr-3">
          Or go back
        </Link>
      </div>
    </fieldset>
  </form>
));
