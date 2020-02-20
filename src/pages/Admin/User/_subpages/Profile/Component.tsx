import React, {memo} from 'react';

import {PasswordInput} from '../../../../../components';
import {tComponentProps} from './_types';

export const ProfileComponent = memo((props: tComponentProps) => (
  <form
    action="/api/v1/user"
    autoComplete="off"
    className="col"
    // encType="multipart/form-data"
    onSubmit={props.save}>
    <fieldset>
      <legend>
        <h1 className="fs3 mB3">Edit your profile</h1>
      </legend>
      <div className="mB4">
        <label className="col row mB3" htmlFor="name">
          <h2 className="ffLab fs5 mB1 lh1">
            Name
          </h2>
          <input
            id="name"
            className="p3 row"
            onChange={ev => props.updateState('name', ev)}
            placeholder={props.name}
            value={props.name}
            name="name"
          />
        </label>
        <label htmlFor="bio">
          <h2 className="ffLab fs5 mB1 lh1">
            Bio
          </h2>
          <p className="fs5 copyBlack mB1">
            Some space to describe yourself, what you do, what you&apos;re interested in, etc.
          </p>
          <textarea
            id="bio"
            rows={6}
            onChange={ev => props.updateState('bio', ev)}
            className="p3 row mB3"
            placeholder={props.bio}
            value={props.bio}
            name="bio"
          />
        </label>
        <label htmlFor="email">
          <h2 className="ffLab fs5 mB1 lh1">
            Email address
          </h2>
          <p className="fs5 copyBlack mB1">
            Used for account verification, event reminders, etc.
          </p>
          <input
            onChange={ev => props.updateState('email', ev)}
            className="p3 row mB1"
            placeholder="Update your email here"
            value={props.email}
            name="email"
          />
        </label>
        <div
          tabIndex={0}
          role="button"
          className="fx aiCtr curPtr mB3 fs6"
          onClick={ev => props.updateState('privateEmail', ev)}
          onKeyPress={ev => props.updateState('privateEmail', ev)}>
          <input
            readOnly
            type="checkbox"
            className="mR2"
            autoComplete="nope"
            checked={props.privateEmail}
          />
          <span>
            {props.privateEmail && 'Your email is kept private'}
            {!props.privateEmail && 'Your email is displayed on your profile.'}
          </span>
        </div>
        <label className="dBl mB3" htmlFor="phone">
          <h2 className="ffLab fs5 mB1 lh1">
            Phone number
          </h2>
          <p className="fs5 copyBlack mB1">
            Used as an additional level of account verification. Always private, never shared with anyone.
          </p>
          <input
            onChange={ev => props.updateState('phone', ev)}
            className="p3 row"
            placeholder="Example: 555-555-5555"
            value={props.phone}
            name="phone"
          />
        </label>
        <label htmlFor="city">
          <h2 className="ffLab fs5 mB1 lh1">
            City
          </h2>
          <p className="fs5 copyBlack mB1">
            Share your location with others (if you want!)
          </p>
          <input
            onChange={ev => props.updateState('city', ev)}
            className="p3 row mB1"
            placeholder="Example: Brooklyn"
            value={props.city}
            name="city"
          />
        </label>
        <label htmlFor="username">
          <h2 className="ffLab fs5 mB1 lh1">
            Username
          </h2>
          <p className="fs5 copyBlack mB1">
            This is your alias. Must be unique, can&apos;t be blank. You must fill this out in order to join groups or RSVP to events. You may change it at any time.
          </p>
          <input
            id="username"
            onChange={ev => props.updateState('username', ev)}
            className="p3 row mB3"
            placeholder="Update your username here"
            value={props.username}
            name="username"
          />
        </label>
        <h2 className="ffLab fs5 mT3 mB1 lh1">
          Other privacy settings
        </h2>
        <div
          tabIndex={0}
          role="button"
          className="fx aiCtr curPtr fs6 p1"
          onClick={ev => props.updateState('privateRSVP', ev)}
          onKeyPress={ev => props.updateState('privateRSVP', ev)}>
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
          className="fx aiCtr curPtr fs6 p1"
          onClick={ev => props.updateState('privateMemberships', ev)}
          onKeyPress={ev => props.updateState('privateMemberships', ev)}>
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
        title="Current password"
        password={props.password}
        placeholder="Your current password"
        onChange={ev => props.updateState('password', ev)}
      />
    </fieldset>
    <button
      disabled={!props.password}
      className="p3 pL4 pR4 hvrBgGrey1 trans1">
      Save Changes
    </button>
  </form>
));

/* <h2 className="ffLab fs5 mB1 lh1">
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
