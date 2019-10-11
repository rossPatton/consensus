import React, {memo} from 'react';

import {PasswordInput} from '../../../../../components';
import {tComponentProps} from './_types';

export const ProfileComponent = memo((props: tComponentProps) => (
  <form
    action="/api/v1/user"
    autoComplete="off"
    className="col"
    encType="multipart/form-data"
    onSubmit={props.save}>
    <fieldset>
      <legend>
        <h1 className="fs2 mB3">Edit your profile</h1>
      </legend>
      <div className="p4 br8 brdA1 mB3">
        <div className="fx aiCtr mB3">
          <label className="col row mR3" htmlFor="name">
            <h2 className="ffLab fs5 mB1 lh1">
              Name
            </h2>
            <input
              id="name"
              className="p3 row"
              onChange={ev => props.updateState('name', ev)}
              placeholder={props.name}
              defaultValue={props.name}
              value={props.name}
              name="name"
            />
          </label>
        </div>
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
            defaultValue={props.bio}
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
            defaultValue={props.email}
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
          {props.privateEmail && (
            <span>Private</span>
          )}
          {!props.privateEmail && (
            <span>Public</span>
          )}
        </div>
        <label htmlFor="username">
          <h2 className="ffLab fs5 mB1 lh1">
            Username
          </h2>
          <p className="fs5 copyBlack mB1">
            This will be your publicly visible name.
          </p>
          <input
            id="username"
            onChange={ev => props.updateState('username', ev)}
            className="p3 row mB3"
            placeholder="Update your username here"
            defaultValue={props.username}
            value={props.username}
            name="username"
          />
        </label>
        <PasswordInput
          id="pwInput"
          title="Current password"
          password={props.password}
          placeholder="Your current password"
          onChange={ev => props.updateState('password', ev)}
        />
        <h2 className="ffLab fs5 mT3 mB1 lh1">
          Other privacy settings
        </h2>
        <div
          tabIndex={0}
          role="button"
          className="fx aiCtr curPtr fs6"
          onClick={ev => props.updateState('privateRSVP', ev)}
          onKeyPress={ev => props.updateState('privateRSVP', ev)}>
          <input
            readOnly
            type="checkbox"
            className="mR2"
            autoComplete="nope"
            checked={props.privateRSVP}
          />
          {props.privateRSVP && (
            <span>Keep my event RSVPs private.</span>
          )}
          {!props.privateRSVP && (
            <span>
              Show my RSVPs publicly (user account will be linked in RSVP list)
            </span>
          )}
        </div>
        <div
          tabIndex={0}
          role="button"
          className="fx aiCtr curPtr mB3 fs6"
          onClick={ev => props.updateState('privateMemberships', ev)}
          onKeyPress={ev => props.updateState('privateMemberships', ev)}>
          <input
            readOnly
            type="checkbox"
            className="mR2"
            autoComplete="nope"
            checked={props.privateMemberships}
          />
          {props.privateMemberships && (
            <span>
              Keep my organization memberships private.
            </span>
          )}
          {!props.privateMemberships && (
            <span>
              Link to organization I am a member of on my profile
            </span>
          )}
        </div>
      </div>
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
