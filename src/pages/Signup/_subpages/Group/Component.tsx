import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Form} from '~app/components';
import {CitySearch} from '~app/components';
import {categories} from '~app/constants';
import {slugify} from '~app/utils';

import {tComponentProps} from './_types';

export const GroupSignupComponent = memo((props: tComponentProps) => (
  <Form
    className="animated fadeInUp"
    error={props.error}
    legend={(<h2 className="text-base font-semibold mb-2">
    Verify your email and sign up!
    </h2>)}
    name="userSignupForm"
    onSubmit={props.verifyAndRegister}
    renderFields={() => (
      <>
        <label htmlFor="tokenInput">
          <h2 className="text-base font-semibold">
            Token
          </h2>
          <p>
            Copy/paste or type the token that was sent to your email to complete the form.
          </p>
          <input
            required
            autoComplete="off"
            name="token" // for non-js submit and passportjs
            id="tokenInput"
            placeholder="Enter the token you received via email"
            className="p-2 w-full mb-2"
            value={props.token}
            onChange={ev => props.updateState('token', ev.currentTarget.value)}
          />
        </label>
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
            minLength={3}
            maxLength={4096}
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
        <h2 className="font-semibold text-base">
          Group URL Preview
        </h2>
        <p className="text-base text-gray-5 mb-1">
          Your group&apos;s url is generated based on your group name. Here&apos;s a preview.
        </p>
        <div className="font-semibold bg-gray-1 border inline-block mb-3 p-1 rounded">
          {`https://consens.us.org/group/${props.handle}`}
        </div>
      </>
    )}
    renderSubmit={formProps => (
      <>
        <button
          disabled={!formProps.hasMounted || !props.token || props.disabled}
          className="p-2 pl-3 pr-3 hover:bg-gray-3 mr-1">
          Create Group!
        </button>
        <Link
          to="/signup"
          className="btn hover:bg-gray-3 p-2 pl-3 pr-3">
          Or go back
        </Link>
      </>
    )}
  />
));
