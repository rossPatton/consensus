import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from '../../_types';
import {CitySearch, ExternalLink, PasswordInput} from '../../../../../../../components';

const EditProfile = memo((props: tComponentProps) => (
  <form
    action="/api/v1/user"
    autoComplete="off"
    onSubmit={props.save}>
    <fieldset>
      <legend>
        <h1 className="fs3 mB3">Edit your profile</h1>
      </legend>
      <div className="mB5">
        <label className="row mB4" htmlFor="username">
          <label htmlFor="avatarEmail">
            <h2 className="fs5 mB1 lh1">
            Connect your avatar
            </h2>
            <p className="fs5 copyBlack mB1">
              We use <ExternalLink noFollow to="https://www.libravatar.org">Libravatar</ExternalLink> for avatars. To connect your avatar, enter your Libravatar email below. It does not have to be the same as your Consensus email. We do not store this. Any changes you make to your avatar on Libravatar will be automatically reflected here.
            </p>
            <input
              autoComplete="nope"
              className="p3 mB4 row"
              onChange={ev => props.updateState('avatarEmail', ev.currentTarget.value)}
              placeholder="your_email_here@example.com"
              value={props.avatarEmail}
              name="avatarEmail"
            />
          </label>
          <h2 className="fs5 mB1 lh1">
            Username
          </h2>
          <p className="fs5 copyBlack mB1">
            This is your display name on the site. Must be unique. You must fill this out in order to join groups or RSVP to events. You may change it at any time.
          </p>
          <input
            id="username"
            className="p3 row"
            onChange={ev => props.updateState('username', ev.currentTarget.value)}
            placeholder="Update your username here"
            value={props.username}
            name="username"
          />
        </label>
        <CitySearch
          {...props}
          updateState={props.updateState}
          label="What city do you live in? This will help us suggest relevant events and groups for you."
        />
        <label className="row mB4" htmlFor="bio">
          <h2 className="fs5 mB1 lh1">
            Bio
          </h2>
          <p className="fs5 copyBlack mB1">
            Some space to describe yourself, what you do, what you&apos;re interested in, etc.
          </p>
          <textarea
            id="bio"
            rows={6}
            onChange={ev => props.updateState('bio', ev.currentTarget.value)}
            className="p3 row"
            placeholder={props.bio}
            value={props.bio}
            name="bio"
          />
        </label>
        <label className="row mB4" htmlFor="name">
          <h2 className="fs5 mB1 lh1">
            Real Name
          </h2>
          <p className="fs5 copyBlack mB1">
            Your legal name. Optional! Leave blank to remain anonymous.
          </p>
          <input
            id="name"
            className="p3 row"
            onChange={ev => props.updateState('name', ev.currentTarget.value)}
            placeholder={props.name}
            value={props.name}
            name="name"
          />
        </label>
        <label className="dBl mB4" htmlFor="website">
          <h2 className="fs5 mB1 lh1">
            Personal Website
          </h2>
          <input
            onChange={ev => props.updateState('website', ev.currentTarget.value)}
            className="p3 row"
            placeholder="Update your website here"
            value={props.website}
            name="website"
          />
        </label>
        <label className="dBl mB4" htmlFor="facebook">
          <h2 className="fs5 mB1 lh1">
            Facebook
          </h2>
          <input
            className="p3 row"
            name="facebook"
            onChange={ev => props.updateState('facebook', ev.currentTarget.value)}
            placeholder="Link your facebook profile here"
            value={props.facebook}
          />
        </label>
        <label className="dBl mB4" htmlFor="twitter">
          <h2 className="fs5 mB1 lh1">
            Twitter
          </h2>
          <input
            className="p3 row"
            name="twitter"
            onChange={ev => props.updateState('twitter', ev.currentTarget.value)}
            placeholder="Link your twitter here"
            value={props.twitter}
          />
        </label>
        <h2 className="fs5 mB1 lh1">
          Other privacy settings
        </h2>
        <div
          tabIndex={0}
          role="button"
          className="fx aiCtr curPtr fs6 p1"
          onClick={() => props.updateState('privateRSVP', !props.privateRSVP)}
          onKeyPress={() => props.updateState('privateRSVP', !props.privateRSVP)}>
          <input
            readOnly
            type="checkbox"
            className="mR2"
            autoComplete="nope"
            checked={props.privateRSVP}
          />
          <span>
            {props.privateRSVP && (
              'Only you can see your RSVPS.'
            )}
            {!props.privateRSVP && (
              'RSVPs will be shown publicly on events you have RSVPd to.'
            )}
          </span>
        </div>
        <div
          tabIndex={0}
          role="button"
          className="fx aiCtr curPtr fs6 p1 mB5"
          onClick={() =>
            props.updateState('privateMemberships', !props.privateMemberships)}
          onKeyPress={() =>
            props.updateState('privateMemberships', !props.privateMemberships)}>
          <input
            readOnly
            type="checkbox"
            className="mR2"
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
      <div className="fx aiCtr">
        <button
          disabled={!props.password}
          className="p3 pL4 pR4 mR2 hvrBgGrey1 trans1">
          Save Changes
        </button>
        <Link
          to="/admin/profile"
          className="btn p3 pL4 pR4 hvrBgGrey1 trans1">
          Go back
        </Link>
      </div>
    </fieldset>
  </form>
));

export default EditProfile;
