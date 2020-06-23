import cx from 'classnames';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {CitySearch, FileUpload, Form} from '~app/components';

import {tComponentProps} from '../../_types';

const EditProfile = memo((props: tComponentProps) => (
  <Form
    className="w-full"
    error={props.error}
    name="editProfile"
    legend={(<h2 className="text-3 mb-2 leading-none">Edit your Profile</h2>)}
    onSubmit={props.save}
    renderFields={() => (
      <>
        <label className="w-full mb-2" htmlFor="memberName">
          <h3 className="text-base mb-1 leading-none">
            Change Email
          </h3>
          <input
            onChange={ev => props.updateState('email', ev.currentTarget.value)}
            className="p-2 w-full"
            placeholder={`Currently ${props.session.profile.email}`}
            value={props.email}
            name="email"
          />
        </label>
        <div className="mb-3">
          <FileUpload
            fieldKey="userAvatar"
            folder="users"
            info="We recommend a size of at least 60x60px"
            prefix={`u${props.session.profile.id}:uAv`}
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
              placeholder=""
              value={props.bio || ''}
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
              maxLength={4096}
              pattern="https://.*"
              placeholder="Link your website here"
              value={props.website}
              name="website"
              type="url"
            />
          </label>
          <label className="block mb-3" htmlFor="facebook">
            <h3 className="text-base mb-1 leading-none">
              Facebook
            </h3>
            <input
              className="p-2 w-full"
              name="facebook"
              maxLength={4096}
              pattern="https://facebook.com/.*"
              onChange={ev => props.updateState('facebook', ev.currentTarget.value)}
              placeholder="Link your facebook profile here"
              value={props.facebook}
              type="url"
            />
          </label>
          <label className="block mb-3" htmlFor="twitter">
            <h3 className="text-base mb-1 leading-none">
              Twitter
            </h3>
            <input
              className="p-2 w-full"
              name="twitter"
              maxLength={4096}
              pattern="https://twitter.com/.*"
              onChange={ev => props.updateState('twitter', ev.currentTarget.value)}
              placeholder="Link your twitter here"
              value={props.twitter}
              type="url"
            />
          </label>
          <h3 className="text-base mb-1 leading-none">
            Other privacy settings
          </h3>
          <div
            tabIndex={0}
            role="button"
            className="flex items-center text-sm font-semibold mb-1"
            onClick={() => props.updateState('privateRSVP', !props.privateRSVP)}
            onKeyPress={() => props.updateState('privateRSVP', !props.privateRSVP)}>
            <input
              readOnly
              type="checkbox"
              className="flex-1 mr-1 w-auto"
              autoComplete="nope"
              checked={props.privateRSVP}
            />
            <span className="w-full">
              {props.privateRSVP && (
                'Only you can see your RSVPS.'
              )}
              {!props.privateRSVP && (
                'RSVPs will be shown publicly on meetings you have RSVPed to.'
              )}
            </span>
          </div>
          <div
            tabIndex={0}
            role="button"
            className="flex items-center font-semibold text-sm mb-3"
            onClick={() =>
              props.updateState('privateMemberships', !props.privateMemberships)}
            onKeyPress={() =>
              props.updateState('privateMemberships', !props.privateMemberships)}>
            <input
              readOnly
              type="checkbox"
              className="flex-1 mr-1 w-auto"
              autoComplete="nope"
              checked={props.privateMemberships}
            />
            <span className="w-full">
              {props.privateMemberships && (
                'Memberships are kept private.'
              )}
              {!props.privateMemberships && (
                'Memberships will be displayed on your profile.'
              )}
            </span>
          </div>
        </div>
      </>
    )}
    renderSubmit={formProps => (
      <div className="flex flex-col d:flex-row items-center">
        <button
          disabled={!formProps.hasMounted}
          className={cx({
            'p-2 pl-3 pr-3 mb-1 d:mb-0 d:mr-1 w-full d:w-auto': true,
            'bg-green-1 hover:bg-green-2': formProps.hasMounted,
          })}>
          Save Changes
        </button>
        <Link
          to="/admin/profile"
          className="btn p-2 pl-3 pr-3 hover:bg-gray-3 transition w-full d:w-auto">
          Go back
        </Link>
      </div>
    )}
  />
));

export default EditProfile;
