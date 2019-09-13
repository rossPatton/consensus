import React, {memo} from 'react';

import {PasswordInput} from '../../../../../components';
import {tComponentProps} from './_types';

export const ProfileComponent = memo((props: tComponentProps) => {
  const {
    email: origEmail,
    fname: origFname,
    // hasAvatar: origAvatar,
    lname: origLname,
    username: origUsername,
  } = props.session;

  return (
    <form
      autoComplete="off"
      action="/api/v1/user"
      encType="multipart/form-data"
      className="col"
      onSubmit={props.save}>
      <fieldset>
        <legend>
          <h1 className="fs2 mB3">Edit your profile</h1>
        </legend>
        <div className="p4 br8 brdA1 mB3">
          {/* <h2 className="ffLab fs5 mB1 lh1">
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
            */}
          <label htmlFor="fname">
            <h2 className="ffLab fs5 mB1 lh1">
              First Name
            </h2>
            <input
              id="fname"
              onChange={ev => props.updateState('fname', ev)}
              className="p3 mB3 row"
              placeholder={origFname}
              value={props.fname}
              name="fname"
            />
          </label>
          <label htmlFor="lname">
            <h2 className="ffLab fs5 mB1 lh1">
              Last Name
            </h2>
            <input
              id="lname"
              onChange={ev => props.updateState('lname', ev)}
              className="p3 mB3 row"
              placeholder={origLname}
              value={props.lname}
              name="lname"
            />
          </label>
          <label htmlFor="email">
            <h2 className="ffLab fs5 mB1 lh1">
              Email address
            </h2>
            <input
              onChange={ev => props.updateState('email', ev)}
              className="p3 mB3 row"
              placeholder={origEmail}
              value={props.email}
              name="email"
            />
          </label>
          <label htmlFor="username">
            <h2 className="ffLab fs5 mB1 lh1">
              Username
            </h2>
            <input
              id="username"
              onChange={ev => props.updateState('username', ev)}
              className="p3 row mB3"
              placeholder={origUsername}
              value={props.username}
              name="username"
            />
          </label>
          <PasswordInput
            newPassword
            id="newPwInput"
            name="newPassword"
            password={props.newPassword}
            placeholder="Your new password"
            onChange={ev => props.updateState('newPassword', ev)}
          />
          <PasswordInput
            id="pwInput"
            title="Current password, required"
            password={props.password}
            placeholder="Your current password"
            onChange={ev => props.updateState('password', ev)}
          />
        </div>
      </fieldset>
      <button className="p3 pL4 pR4 hvrBgGrey1 trans1">
        Save Changes
      </button>
    </form>
  );
});
