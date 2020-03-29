import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from '../../_types';
import {CitySearch, PasswordInput} from '../../../../../../../components';

const EditProfile = memo((props: tComponentProps) => (
  <form
    action="/api/v1/user"
    autoComplete="off"
    onSubmit={props.save}>
    <fieldset>
      <legend>
        <h1 className="fs3 mB3">Edit your profile</h1>
      </legend>
      <div className="mB4">
        <label className="row mB4" htmlFor="username">
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
            Your legal name. Completely optional. Leave blank if you want to be anonymous.
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

/* <h2 className="fs5 mB1 lh1">
            Avatar
          </h2>
          <div className="fx aiCtr mB3">
            {origAvatar && (
              <div className="bgGrey1 p3 mR3 fx fxdCol aiCtr" id="avatarPreview">
                <button
                  onClick={() => {}}
                  className="bgWhite mB2 p2 pL3 pR3">
                  <span
                    role="img"
                    className="mR1"
                    aria-label="X Emoji">
                  ✖️
                  </span>
                Remove
                </button>
                <img
                  alt=""
                  className="row"
                  height="200"
                  width="200"
                  src=""
                />
              Current Avatar
              </div>
            )}
            {!origAvatar && (
              <label
                htmlFor="fileUpload"
                className="col rel fx fxdCol aiCtr jcCtr br8 brdA1 bsDashed brdW3 mB3 p5 curPtr">
                <input
                  type="file"
                  name="userAvatar"
                  id="fileUpload"
                  onChange={() => {}}
                  accept="image/png, image/jpeg, image/gif"
                />
                <span className="btn fx aiCtr p3 hvrBgGrey1">
                  <span
                    role="img"
                    className="mR1"
                    aria-label="Camera Emoji">
                  📷
                  </span>
                Upload Your Avatar
                </span>
                <small>We recommend a size of at least 200x200px</small>
              </label>
            )}
          </div>
            */
