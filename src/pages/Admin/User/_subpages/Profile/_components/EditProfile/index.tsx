import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {CitySearch, FileUpload, PasswordInput} from '~app/components';

import {tComponentProps} from '../../_types';

const EditProfile = memo((props: tComponentProps) => (
  <form
    autoComplete="off"
    onSubmit={props.save}>
    <fieldset>
      <legend>
        <h2 className="font-semibold mb-2">
          Edit your profile
        </h2>
      </legend>
      <div className="mb-3">
        <FileUpload
          fieldKey="userAvatar"
          folder="users"
          info="We recommend a size of at least 60x60px"
          prefix={`u${props.session.id}:uAv`}
          title="Upload or Replace Avatar"
        />
        <label className="w-full mb-3" htmlFor="username">
          <h3 className="text-base mb-1 leading-none">
            Username
          </h3>
          <p className="text-base text-gray-5 mb-1">
            This is your display name on the site. Must be unique. You must fill this out in order to join groups or RSVP to meetings. You may change it at any time.
          </p>
          <input
            id="username"
            className="p-2 w-full"
            minLength={3}
            onChange={ev => props.updateState('username', ev.currentTarget.value)}
            placeholder="Update your username here"
            value={props.username}
            name="username"
          />
        </label>
        <CitySearch
          {...props}
          updateState={props.updateState}
          label="What city do you live in? This will help us suggest relevant meetings and groups for you."
        />
        <label className="w-full mb-3" htmlFor="bio">
          <h3 className="text-base mb-1 leading-none">
            Bio
          </h3>
          <p className="text-base text-gray-5 mb-1">
            Some space to describe yourself, what you do, what you&apos;re interested in, etc.
          </p>
          <textarea
            id="bio"
            rows={6}
            onChange={ev => props.updateState('bio', ev.currentTarget.value)}
            className="p-2 w-full"
            placeholder={props.bio}
            value={props.bio}
            name="bio"
          />
        </label>
        <label className="w-full mb-3" htmlFor="name">
          <h3 className="text-base mb-1 leading-none">
            Real Name
          </h3>
          <p className="text-base text-gray-5 mb-1">
            Your legal name. Optional! Leave blank to remain anonymous.
          </p>
          <input
            id="name"
            className="p-2 w-full"
            onChange={ev => props.updateState('name', ev.currentTarget.value)}
            placeholder={props.name}
            value={props.name}
            name="name"
          />
        </label>
        <label className="block mb-3" htmlFor="website">
          <h3 className="text-base mb-1 leading-none">
            Personal Website
          </h3>
          <input
            onChange={ev => props.updateState('website', ev.currentTarget.value)}
            className="p-2 w-full"
            placeholder="Update your website here"
            value={props.website}
            name="website"
          />
        </label>
        <label className="block mb-3" htmlFor="facebook">
          <h3 className="text-base mb-1 leading-none">
            Facebook
          </h3>
          <input
            className="p-2 w-full"
            name="facebook"
            onChange={ev => props.updateState('facebook', ev.currentTarget.value)}
            placeholder="Link your facebook profile here"
            value={props.facebook}
          />
        </label>
        <label className="block mb-3" htmlFor="twitter">
          <h3 className="text-base mb-1 leading-none">
            Twitter
          </h3>
          <input
            className="p-2 w-full"
            name="twitter"
            onChange={ev => props.updateState('twitter', ev.currentTarget.value)}
            placeholder="Link your twitter here"
            value={props.twitter}
          />
        </label>
        <h3 className="text-base mb-1 leading-none">
          Other privacy settings
        </h3>
        <div
          tabIndex={0}
          role="button"
          className="flex d:flex-row items-center text-sm mb-1"
          onClick={() => props.updateState('privateRSVP', !props.privateRSVP)}
          onKeyPress={() => props.updateState('privateRSVP', !props.privateRSVP)}>
          <input
            readOnly
            type="checkbox"
            className="mr-2"
            autoComplete="nope"
            checked={props.privateRSVP}
          />
          <span>
            {props.privateRSVP && (
              'Only you can see your RSVPS.'
            )}
            {!props.privateRSVP && (
              'RSVPs will be shown publicly on meetings you have RSVPd to.'
            )}
          </span>
        </div>
        <div
          tabIndex={0}
          role="button"
          className="flex flex-col d:flex-row items-center text-sm mb-3"
          onClick={() =>
            props.updateState('privateMemberships', !props.privateMemberships)}
          onKeyPress={() =>
            props.updateState('privateMemberships', !props.privateMemberships)}>
          <input
            readOnly
            type="checkbox"
            className="mr-2"
            autoComplete="nope"
            checked={props.privateMemberships}
          />
          <span>
            {props.privateMemberships && (
              'Memberships are kept private.'
            )}
            {!props.privateMemberships && (
              'Memberships will be displayed on your profile.'
            )}
          </span>
        </div>
      </div>
      <PasswordInput
        id="pwInput"
        title="Current Password"
        password={props.password}
        placeholder="Your current password"
        onChange={ev => props.updateState('password', ev.currentTarget.value)}
      />
      <div className="flex flex-col d:flex-row items-center">
        <button
          disabled={!props.password}
          className="p-2 pl-3 pr-3 mr-1 hover:bg-gray-3">
          Save Changes
        </button>
        <Link
          to="/admin/profile"
          className="btn p-2 pl-3 pr-3 hover:bg-gray-3">
          Go back
        </Link>
      </div>
    </fieldset>
  </form>
));

export default EditProfile;
